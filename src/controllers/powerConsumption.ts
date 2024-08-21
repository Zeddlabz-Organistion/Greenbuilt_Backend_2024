import { getAllByQuery } from './../helpers/crud'
import { Request, Response } from 'express'
import formidable from 'formidable'
import { getSignedUrlForDocs } from '../helpers/awss3'
import fs from 'fs'
import sharp from 'sharp'
import { prisma } from '../prisma/index'
import { loggerUtil as logger } from '../utils/logger'
import { statusCode as SC } from '../utils/statusCode'
import { isEmpty } from 'lodash'
import { loguser } from '../helpers/logUser'
import {
	create,
	deleteById,
	getAllById,
	getById,
	updateById
} from '../helpers/crud'
import { getObjectUrl } from '../helpers/awss3'

export const createEnergyConsumption = async (
	req: any,
	res: Response
): Promise<any> => {
	const userId = +(req.auth._id || '0')
	try {
		const {
			fileName,
			totalConsumption,
			totalGreenConsumption,
			date,
			month,
			year,
			fullDate
		} = req.body

		const existingData = await prisma.montlyConsumptionPlan.findMany({
			where: {
				userId: userId,
				month: +month,
				year: +year
			}
		})

		if (existingData.length) {
			const { url, key } = await getSignedUrlForDocs(
				'PowerConsumption',
				fileName,
				userId
			)
			const dataPrisma = {
				date: +date || new Date().getDate(),
				month: +month || new Date().getMonth() + 1,
				year: +year || new Date().getFullYear(),
				fullDate: fullDate ? new Date(fullDate) : new Date(),
				totalConsumption,
				totalGreenConsumption,
				userId,
				ebBillLocation: '',
				location: key
			}

			const queryObj = {
				month: +month,
				year: +year,
				userId
			}

			const existingRecord = await getAllByQuery(
				prisma.powerConsumption,
				queryObj
			)

			if (existingRecord.length === 0) {
				const newRecord = await create(prisma.powerConsumption, dataPrisma)

				if (newRecord) {
					const userData = await getById(prisma.user, 'id', userId)

					loguser(
						userData?.id!,
						userData?.name!,
						userData?.role!,
						'Power consumption data created successfully!',
						newRecord
					)

					return res.status(SC.OK).json({
						message: 'Power consumption data created successfully!',
						data: newRecord,
						url
					})
				}
			} else {
				return res.status(SC.BAD_REQUEST).json({
					error:
						'Power consumption data for this month is already present for the user!'
				})
			}
		} else {
			return res
				.status(SC.BAD_REQUEST)
				.json({ error: 'No Monthly Plan Found for this month.' })
		}
	} catch (err: any) {
		logger(err, 'ERROR')
		return res.status(SC.BAD_REQUEST).json({
			error: 'Error while creating Power consumption data'
		})
	} finally {
		logger('Create Power Consumption API Called!')
	}
}

export const updateEnergyConsumption = async (
	req: any,
	res: Response
): Promise<any> => {
	const powerConsumptionId = +(req.params.powerConsumptionId || '0')
	const userId = req.auth._id
	try {
		const form = new formidable.IncomingForm()
		await form.parse(req, async (err: any, fields: any, { file }: any) => {
			if (err) {
				logger(err, 'ERROR')
				res.status(SC.BAD_REQUEST).json({
					error: 'Problem with document'
				})
			}
			if (file) {
				if (file.size > 3000000) {
					res.status(SC.BAD_REQUEST).json({
						error: 'File size should be less than 3 MB'
					})
				} else {
					sharp(fs.readFileSync(file.filepath))
						.resize(1000)
						.toBuffer()
						.then(async doc => {
							const data = {
								...fields,
								ebBill: doc
							}
							await create(prisma.powerConsumption, data)
								.then(async data => {
									const userData = await getById(prisma.user, 'id', userId)

									loguser(
										userData?.id!,
										userData?.name!,
										userData?.role!,
										`Power consumption data updated sucessfully. and power consumption id is ${powerConsumptionId}`,
										res
									)
									return res.status(SC.OK).json({
										message: 'Power consumption data updated sucessfully!',
										data: data
									})
								})
								.catch(err => {
									logger(err, 'ERROR')
									return res.status(SC.BAD_REQUEST).json({
										error: 'Error while updating Power consumption data '
									})
								})
						})
				}
			} else {
				const data = { ...fields }
				await updateById(
					prisma.powerConsumption,
					data,
					'id',
					powerConsumptionId
				)
					.then(async data => {
						const userData = await getById(prisma.user, 'id', data.userId)

						loguser(
							userData?.id!,
							userData?.name!,
							userData?.role!,
							`Power consumption data updated sucessfully!`,
							res
						)
						return res.status(SC.OK).json({
							message: 'Power consumption data updated sucessfully!',
							data: data
						})
					})
					.catch(err => {
						logger(err, 'ERROR')
						return res.status(SC.BAD_REQUEST).json({
							error: 'Error while updating Power consumption data '
						})
					})
			}
		})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Create Power Consumption API Called!`)
	}
}

export const approvePowerConsumption = async (
	req: any,
	res: Response
): Promise<any> => {
	const id = +(req.params.powerConsumptionId || '0')
	const userId = req.auth._id
	const userData = await getById(prisma.user, 'id', userId)
	try {
		await prisma.powerConsumption
			.update({
				where: {
					id
				},
				data: {
					isApproved: true
				}
			})
			.then(async data => {
				// data.userId
				await prisma.montlyConsumptionPlan
					.findMany({
						where: {
							userId: data?.userId,
							month: data.month,
							year: data.year
						}
					})
					.then(async monthlyPlans => {
						if (monthlyPlans.length) {
							await prisma.user
								.findFirst({
									where: {
										id: data?.userId
									}
								})

								.then(async user => {
									loguser(
										userData?.id!,
										userData?.name!,
										userData?.role!,
										`Power consumption  has been approved sucessfully. and user name is ${user?.name}, id is ${user?.id}`,
										res
									)

									res.status(SC.OK).json({
										message: 'Power consumption  has been approved sucessfully!'
									})
								})
								.catch(err => {
									logger(err, 'ERROR')
									res.status(SC.BAD_REQUEST).json({
										error:
											'Error while approving power consumption plan with source type'
									})
								})
						} else {
							res.status(SC.NOT_FOUND).json({
								message: 'No monthly plans found!'
							})
						}
					})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Approve Power Consumption with Source API Called!`)
	}
}

export const deletePowerConsumption = async (
	req: any,
	res: Response
): Promise<any> => {
	const powerConsumptionId = +(req.params.powerConsumptionId || '0')
	try {
		const userId = req.auth._id
		const userData = await getById(prisma.user, 'id', userId)
		await deleteById(prisma.powerConsumption, 'id', powerConsumptionId)
			.then(async data => {
				console.log(data)
				loguser(
					userData?.id!,
					userData?.name!,
					userData?.role!,
					'Power consumption data deleted sucessfully!',
					res
				)
				return res.status(SC.OK).json({
					message: 'Power consumption data deleted sucessfully!'
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Error while deleting Power consumption data'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Delete Power consumption API Called!`)
	}
}

export const getPowerConsumptionById = async (
	req: Request,
	res: Response
): Promise<any> => {
	const powerConsumptionId = +(req.params.powerConsumptionId || '0')

	try {
		const data = await getById(
			prisma.powerConsumption,
			'id',
			powerConsumptionId
		)
		if (isEmpty(data)) {
			return res.status(SC.NOT_FOUND).json({
				message: 'Power consumption data was not found!'
			})
		}
		const url = await getObjectUrl(data.location)
		data.url = url
		return res.status(SC.OK).json({
			message: 'Power consumption data fetched successfully!',
			data: data
		})
	} catch (err: any) {
		logger(err, 'ERROR')
		return res.status(SC.BAD_REQUEST).json({
			error: 'Error while fetching power consumption data'
		})
	} finally {
		logger('Get Power consumption API Called!')
	}
}

export const getAllPowerConsumptionByUser = async (
	req: Request,
	res: Response
): Promise<any> => {
	const userId = +(req.params.userId || '0')
	const take = +(req.query.limit || '10'),
		skip = +(req.query.offset || '0')
	try {
		await getAllById(prisma.powerConsumption, 'userId', userId, take, skip)
			.then(data => {
				if (isEmpty(data)) {
					return res.status(SC.NOT_FOUND).json({
						message: 'Power consumption data was found!'
					})
				}
				return res.status(SC.OK).json({
					message: 'User Power consumption data fetched sucessfully!',
					data: data
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Error while fetching user Power consumption data'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get user Power consumption API Called!`)
	}
}

export const getAllPowerConsumption = async (
	req: Request,
	res: Response
): Promise<any> => {
	const take = +(req.query.limit || '10'),
		skip = +(req.query.offset || '0')
	try {
		await prisma.powerConsumption
			.findMany({ include: { user: true }, take, skip })
			.then(data => {
				if (isEmpty(data)) {
					return res.status(SC.NOT_FOUND).json({
						message: 'Power consumption data was found!'
					})
				}
				return res.status(SC.OK).json({
					message: 'Power consumption data fetched sucessfully!',
					data: data
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Error while fetching Power consumption data'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get All Power consumption API Called!`)
	}
}
