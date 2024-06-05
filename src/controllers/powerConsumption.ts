import { getAllByQuery } from './../helpers/crud'
import { Request, Response } from 'express'
import formidable from 'formidable'
import AWS from 'aws-sdk'
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

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
	region: 'ap-south-1'
})

export const createEnergyConsumption = async (
	req: any,
	res: Response
): Promise<any> => {
	const userId = +(req.auth._id || '0')
	try {
		const form = new formidable.IncomingForm()
		await form.parse(req, (err: any, fields: any, { file }: any) => {
			prisma.montlyConsumptionPlan
				.findMany({
					where: {
						userId: userId,
						month: +fields.month,
						year: +fields.year
					}
				})
				.then(async monthlyPlans => {
					if (monthlyPlans.length) {
						if (err) {
							logger(err, 'ERROR')
							res.status(SC.BAD_REQUEST).json({
								error: 'Problem with document'
							})
						}
						if (file.size > 3000000) {
							res.status(SC.BAD_REQUEST).json({
								error: 'File size should be less than 3 MB'
							})
						} else {
							const {
								totalConsumption,
								totalGreenConsumption,
								date,
								month,
								year,
								fullDate
							} = fields
							console.log({
								typeofs: {
									month: typeof month,
									year: typeof year,
									date: typeof date,
									fullDate: typeof fullDate
								}
							})
							sharp(fs.readFileSync(file.filepath))
								.resize(1000)
								.toBuffer()
								.then(async doc => {
									const dataS3 = {
										Bucket: 'green-built-documents',
										Key: `ebBil-${userId}-${date}-${month}-${year}-`,
										Body: doc,
										ContentType: file.mimetype
									}
									const dataPrisma = {
										date: +date || new Date().getDate(),
										month: +month || new Date().getMonth() + 1,
										year: +year || new Date().getFullYear(),
										fullDate: fullDate ? new Date(fullDate) : new Date(),
										totalConsumption,
										totalGreenConsumption,
										userId,
										ebBillLocation: ''
									}
									const queryObj = {
										month: +month,
										year: +year,
										userId
									}
									logger('Hello world')
									s3.upload(dataS3, (err: any, response: any) => {
										if (err) {
											logger('ERROR')
											logger(err)
											return res.status(SC.BAD_REQUEST).json({
												error: 'Error while uploading document'
											})
										} else {
											logger('File Uploaded Successfully')
											dataPrisma.ebBillLocation = response.Location
											getAllByQuery(prisma.powerConsumption, queryObj).then(
												async val => {
													if (!val.length) {
														await create(prisma.powerConsumption, dataPrisma)
															.then(async data => {
																const userData = await getById(
																	prisma.user,
																	'id',
																	userId
																)

																loguser(
																	userData?.id!,
																	userData?.name!,
																	userData?.role!,
																	`Power consumption data created sucessfully!`,
																	res
																)
																return res.status(SC.OK).json({
																	message:
																		'Power consumption data created sucessfully!',
																	data: data
																})
															})
															.catch(err => {
																logger(err, 'ERROR')
																return res.status(SC.BAD_REQUEST).json({
																	error:
																		'Error while creating Power consumption data'
																})
															})
													} else {
														res.status(SC.BAD_REQUEST).json({
															error:
																'Power consumption data for this month is already present for the user!'
														})
													}
												}
											)
										}
										return
									})
								})
						}
					} else {
						res
							.status(SC.BAD_REQUEST)
							.json({ error: 'No Monthly Plan Found for this month.' })
					}
				})
		})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Create Power Consumption API Called!`)
	}
}

export const updateEnergyConsumption = async (
	req: any,
	res: Response
): Promise<any> => {
	const powerConsumptionId = +(req.params.powerConsumptionId || '0')
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
	req: Request,
	res: Response
): Promise<any> => {
	const id = +(req.params.powerConsumptionId || '0')

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

								.then(async userData => {
									loguser(
										userData?.id!,
										userData?.name!,
										userData?.role!,
										`Power consumption  has been approved sucessfully!`,
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
	req: Request,
	res: Response
): Promise<any> => {
	const powerConsumptionId = +(req.params.powerConsumptionId || '0')
	try {
		await deleteById(prisma.powerConsumption, 'id', powerConsumptionId)
			.then(async data => {
				const userData = await getById(prisma.user, 'id', data.userId)

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
		await getById(prisma.powerConsumption, 'id', powerConsumptionId)
			.then(data => {
				if (isEmpty(data)) {
					return res.status(SC.NOT_FOUND).json({
						message: 'Power consumption data was not found!'
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
		logger(`Get Power consumption API Called!`)
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
