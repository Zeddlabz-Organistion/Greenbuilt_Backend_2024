import { Request, Response } from 'express'
import { prisma } from '../prisma/index'
import { loggerUtil as logger } from '../utils/logger'
import { statusCode as SC } from '../utils/statusCode'
import { v4 as uuid } from 'uuid'
import {
	create,
	createMany,
	updateById,
	deleteById,
	getById,
	getAllById,
	getAll
} from '../helpers/crud'
import { loguser } from '../helpers/logUser'
interface Asset {
	assetId: string
	name: string
	industryName?: string
	locationNumber?: string
	noOfWtgs?: number
	ownCaptive?: string
	dateOfCommisioning?: string
	feeder?: string
	sourceType: string
	serviceNo?: string
	make?: string
	model?: string
	capacity?: string
	edc?: string
	substation?: string
	latitude?: string
	longitude?: string
	userId: number
}

export const createAsset = async (req: any, res: Response): Promise<any> => {
	const userId = +(req.params.userId || '0')
	const asset: Asset = req.body.asset
	const data = {
		...asset,
		assetId: uuid(),
		userId
	}
	const userData = await getById(prisma.user, 'id', req.auth._id)
	try {
		await create(prisma.asset, data)
			.then(data => {
				loguser(
					userData?.id!,
					userData?.name!,
					userData?.role!,
					`Asset created successfully! for this user id ${userId}`,
					res
				)
				return res.status(SC.OK).json({
					message: 'Asset created successfully by admin',
					data
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Asset creation failed!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Create Asset API Called!`)
	}
}

export const bulkUpload = async (req: any, res: Response): Promise<any> => {
	const userId = +(req.params.userId || '0')
	const userData = await getById(prisma.user, 'id', req.auth._id)
	const assets: Asset[] = req.body.assets
	const data = assets?.map(val => ({ ...val, assetId: uuid(), userId }))
	try {
		await createMany(prisma.asset, data)
			.then(data => {
				loguser(
					userData?.id!,
					userData?.name!,
					userData?.role!,
					`Assets upload in bulk successfully for this user id ${userId}`,
					res
				)

				return res.status(SC.OK).json({
					message: 'Assets upload in bulk successfully!',
					data
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Assets upload failed!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Bulk upload Asset API Called!`)
	}
}

export const updateAsset = async (req: any, res: Response): Promise<any> => {
	const assetId = req.params.assetId
	const asset: Asset = req.body.asset
	try {
		const data = await updateById(prisma.asset, asset, 'assetId', assetId)
		const userData = await getById(prisma.user, 'id', req.auth._id)

		loguser(
			userData?.id!,
			userData?.name!,
			userData?.role!,
			`Asset updated successfully! Asset id is ${assetId}`,
			res
		)

		return res.status(SC.OK).json({
			message: 'Asset updated successfully!',
			data
		})
	} catch (err: any) {
		logger(err, 'ERROR')
		return res.status(SC.BAD_REQUEST).json({
			error: 'Asset updation failed!'
		})
	} finally {
		logger(`Asset Update API Called!`)
	}
}

export const deleteAsset = async (req: any, res: Response): Promise<any> => {
	const assetId = req.params.assetId
	try {
		await deleteById(prisma.asset, 'assetId', assetId)

		const userData = await getById(prisma.user, 'id', req.auth._id)

		loguser(
			userData?.id!,
			userData?.name!,
			userData?.role!,
			`Asset deleted successfully! and assetId is ${assetId}`,
			res
		)

		return res.status(SC.OK).json({
			message: 'Asset deleted successfully!'
		})
	} catch (err: any) {
		logger(err, 'ERROR')
		return res.status(SC.BAD_REQUEST).json({
			error: 'Asset deletion failed!'
		})
	} finally {
		logger(`Asset Delete API Called!`)
	}
}

export const getAssetById = async (
	req: Request,
	res: Response
): Promise<any> => {
	const assetId = req.params.assetId
	try {
		await getById(prisma.asset, 'assetId', assetId)
			.then(data => {
				if (!data) {
					return res.status(SC.OK).json({
						message: 'Asset not found!'
					})
				}
				return res.status(SC.OK).json({
					message: 'Asset fetched successfully!',
					data
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to fetch asset!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get Asset API Called!`)
	}
}

export const getAllUserAssets = async (
	req: Request,
	res: Response
): Promise<any> => {
	const userId = +(req.params.userId || '0')
	const take = +(req.query.limit || '10'),
		skip = +(req.query.offset || '0')
	try {
		await getAllById(prisma.asset, 'userId', userId, take, skip)
			.then(data => {
				if (!data?.length) {
					return res.status(SC.OK).json({
						message: 'Assets not found!'
					})
				}
				return res.status(SC.OK).json({
					message: 'User Assets fetched successfully!',
					data,
					pagination: {
						limit: take,
						offset: skip
					}
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to fetch user assets!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get All User Assets API Called!`)
	}
}

export const getAllAssets = async (
	req: Request,
	res: Response
): Promise<any> => {
	const take = +(req.query.limit || '10'),
		skip = +(req.query.offset || '0')
	try {
		await getAll(prisma.asset, take, skip)
			.then(data => {
				if (!data?.length) {
					return res.status(SC.OK).json({
						message: 'Assets not found!'
					})
				}
				return res.status(SC.OK).json({
					message: 'All Assets fetched successfully!',
					data,
					pagination: {
						limit: take,
						offset: skip
					}
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to fetch all assets!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get All Assets API Called!`)
	}
}
