import { Request, Response } from 'express'
import {
	create,
	deleteById,
	getAll,
	getById,
	updateById
} from '../helpers/crud'
import { prisma } from '../prisma/index'
import { loggerUtil as logger } from '../utils/logger'
import { statusCode as SC } from '../utils/statusCode'
import { v4 as uuid } from 'uuid'
import { loguser } from '../helpers/logUser'
/**
 * industry type goes here
 */
export const createIndustryType = async (
	req: any,
	res: Response
): Promise<any> => {
	const userId = req.auth._id
	const data = {
		industryTypeId: uuid(),
		name: req.body.name
	}
	await create(prisma.industryType, data)
		.then(async data => {
			const userData = await getById(prisma.user, 'id', userId)

			loguser(
				userData?.id!,
				userData?.name!,
				userData?.role!,
				'Industry type successfully created!',
				res
			)
			res.status(SC.OK).json({
				message: 'Industry type successfully created!',
				data
			})
		})
		.catch(err => {
			logger(err, 'ERROR')
			res.status(SC.BAD_REQUEST).json({
				message: 'Failed to create Industry Type'
			})
		})
}

export const updateIndustryType = async (
	req: any,
	res: Response
): Promise<any> => {
	const userId = req.auth._id
	const data = req.body
	const industryTypeId = req.params.industryTypeId
	if (!industryTypeId) {
		res.status(SC.BAD_REQUEST).json({
			message: 'id should be passed as a param!'
		})
		return
	}
	await updateById(prisma.industryType, data, 'industryTypeId', industryTypeId)
		.then(async data => {
			const userData = await getById(prisma.user, 'id', userId)

			loguser(
				userData?.id!,
				userData?.name!,
				userData?.role!,
				'Industry type updated successfully!',
				res
			)
			res.status(SC.OK).json({
				message: 'Industry type updated successfully!',
				data
			})
		})
		.catch(err => {
			logger(err, 'ERROR')
			res.status(SC.BAD_REQUEST).json({
				message: 'Failed to update Industry Type'
			})
		})
}

export const deleteIndustryType = async (
	req: any,
	res: Response
): Promise<any> => {
	const userId = req.auth._id
	const industryTypeId = req.params.industryTypeId
	if (!industryTypeId) {
		res.status(SC.BAD_REQUEST).json({
			message: 'id should be passed as a param!'
		})
		return
	}
	await deleteById(prisma.industryType, 'industryTypeId', industryTypeId)
		.then(async data => {
			const userData = await getById(prisma.user, 'id', userId)

			loguser(
				userData?.id!,
				userData?.name!,
				userData?.role!,
				'Industry type deleted successfully!',
				res
			)
			res.status(SC.OK).json({
				message: 'Industry type deleted successfully!',
				data
			})
		})
		.catch(err => {
			logger(err, 'ERROR')
			res.status(SC.BAD_REQUEST).json({
				message: 'Failed to delete Industry Type'
			})
		})
}

export const getIndustryType = async (
	req: Request,
	res: Response
): Promise<any> => {
	const industryTypeId = req.params.industryTypeId
	try {
		await getById(prisma.industryType, 'industryTypeId', industryTypeId)
			.then(data => {
				return res.status(SC.OK).json({
					message: 'Industry Type fetched successfully!',
					data
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to fetch the Industry type!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get Industry Type API Called!`)
	}
}

export const getAllIndustryTypes = async (
	req: Request,
	res: Response
): Promise<any> => {
	const take = +(req.query.limit || '10'),
		skip = +(req.query.offset || '0')
	try {
		await getAll(prisma.industryType, take, skip)
			.then(data => {
				return res.status(SC.OK).json({
					message: 'All Industry Types fetched successfully!',
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
					error: 'Failed to fetch the products!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get All Industry Types API Called!`)
	}
}

/**
 * source type goes here
 */
export const createSourceType = async (
	req: any,
	res: Response
): Promise<any> => {
	const userId = req.auth._id
	const data = {
		sourceTypeId: uuid(),
		name: req.body.name
	}
	await create(prisma.sourceType, data)
		.then(async data => {
			const userData = await getById(prisma.user, 'id', userId)

			loguser(
				userData?.id!,
				userData?.name!,
				userData?.role!,
				'Source type successfully created!',
				res
			)
			res.status(SC.OK).json({
				message: 'Source type successfully created!',
				data
			})
		})
		.catch(err => {
			logger(err, 'ERROR')
			res.status(SC.BAD_REQUEST).json({
				message: 'Failed to create Source Type'
			})
		})
}

export const updateSourceType = async (
	req: any,
	res: Response
): Promise<any> => {
	const userId = req.auth._id
	const data = req.body
	const sourceTypeId = req.params.sourceTypeId
	if (!sourceTypeId) {
		res.status(SC.BAD_REQUEST).json({
			message: 'id should be passed as a param!'
		})
		return
	}
	await updateById(prisma.sourceType, data, 'sourceTypeId', sourceTypeId)
		.then(async data => {
			const userData = await getById(prisma.user, 'id', userId)

			loguser(
				userData?.id!,
				userData?.name!,
				userData?.role!,
				'Source type updated successfully!',
				res
			)
			res.status(SC.OK).json({
				message: 'Source type updated successfully!',
				data
			})
		})
		.catch(err => {
			logger(err, 'ERROR')
			res.status(SC.BAD_REQUEST).json({
				message: 'Failed to update Source type'
			})
		})
}

export const deleteSourceType = async (
	req: any,
	res: Response
): Promise<any> => {
	const userId = req.auth._id
	const sourceTypeId = req.params.sourceTypeId
	if (!sourceTypeId) {
		res.status(SC.BAD_REQUEST).json({
			message: 'id should be passed as a param!'
		})
		return
	}
	await deleteById(prisma.sourceType, 'sourceTypeId', sourceTypeId)
		.then(async data => {
			const userData = await getById(prisma.user, 'id', userId)

			loguser(
				userData?.id!,
				userData?.name!,
				userData?.role!,
				'Source type deleted successfully!',
				res
			)
			res.status(SC.OK).json({
				message: 'Source type deleted successfully!',
				data
			})
		})
		.catch(err => {
			logger(err, 'ERROR')
			res.status(SC.BAD_REQUEST).json({
				message: 'Failed to delete Source type'
			})
		})
}

export const getSourceType = async (
	req: Request,
	res: Response
): Promise<any> => {
	const sourceTypeId = req.params.sourceTypeId
	try {
		await getById(prisma.sourceType, 'sourceTypeId', sourceTypeId)
			.then(data => {
				return res.status(SC.OK).json({
					message: 'Source Type fetched successfully!',
					data
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to fetch the source type!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get Source Type API Called!`)
	}
}

export const getAllSourceTypes = async (
	req: Request,
	res: Response
): Promise<any> => {
	const take = +(req.query.limit || '10'),
		skip = +(req.query.offset || '0')
	try {
		await getAll(prisma.sourceType, take, skip)
			.then(data => {
				return res.status(SC.OK).json({
					message: 'All Source Types fetched successfully!',
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
					error: 'Failed to fetch the source types!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get All Source Types API Called!`)
	}
}

/**
 * UOM goes here
 */
export const createUOM = async (req: any, res: Response): Promise<any> => {
	const userId = req.auth._id
	const data = {
		uomId: uuid(),
		name: req.body.name
	}
	await create(prisma.uOM, data)
		.then(async data => {
			const userData = await getById(prisma.user, 'id', userId)

			loguser(
				userData?.id!,
				userData?.name!,
				userData?.role!,
				'UOM successfully created!',
				res
			)
			res.status(SC.OK).json({
				message: 'UOM successfully created!',
				data
			})
		})
		.catch(err => {
			logger(err, 'ERROR')
			res.status(SC.BAD_REQUEST).json({
				message: 'Failed to create UOM'
			})
		})
}

export const updateUOM = async (req: any, res: Response): Promise<any> => {
	const userId = req.auth._id
	const data = req.body
	const uomId = req.params.uomId
	if (!uomId) {
		res.status(SC.BAD_REQUEST).json({
			message: 'id should be passed as a param!'
		})
		return
	}
	await updateById(prisma.uOM, data, 'uomId', uomId)
		.then(async data => {
			const userData = await getById(prisma.user, 'id', userId)

			loguser(
				userData?.id!,
				userData?.name!,
				userData?.role!,
				'UOM updated successfully!',
				res
			)
			res.status(SC.OK).json({
				message: 'UOM updated successfully!',
				data
			})
		})
		.catch(err => {
			logger(err, 'ERROR')
			res.status(SC.BAD_REQUEST).json({
				message: 'Failed to update UOM'
			})
		})
}

export const deleteUOM = async (req: any, res: Response): Promise<any> => {
	const userId = req.auth._id
	const uomId = req.params.uomId
	if (!uomId) {
		res.status(SC.BAD_REQUEST).json({
			message: 'id should be passed as a param!'
		})
		return
	}
	await deleteById(prisma.uOM, 'uomId', uomId)
		.then(async data => {
			const userData = await getById(prisma.user, 'id', userId)

			loguser(
				userData?.id!,
				userData?.name!,
				userData?.role!,
				'UOM deleted successfully!',
				res
			)
			res.status(SC.OK).json({
				message: 'UOM deleted successfully!',
				data
			})
		})
		.catch(err => {
			logger(err, 'ERROR')
			res.status(SC.BAD_REQUEST).json({
				message: 'Failed to delete UOM'
			})
		})
}

export const getUOM = async (req: Request, res: Response): Promise<any> => {
	const uomId = req.params.uomId
	try {
		await getById(prisma.uOM, 'uomId', uomId)
			.then(data => {
				return res.status(SC.OK).json({
					message: 'UOM fetched successfully!',
					data
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to fetch the UOM!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get UOM API Called!`)
	}
}

export const getAllUOMs = async (req: Request, res: Response): Promise<any> => {
	const take = +(req.query.limit || '10'),
		skip = +(req.query.offset || '0')
	try {
		await getAll(prisma.uOM, take, skip)
			.then(data => {
				return res.status(SC.OK).json({
					message: 'All UOMs fetched successfully!',
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
					error: 'Failed to fetch UOMs!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get All UOMs API Called!`)
	}
}

/**
 * packaging type goes here
 */
export const createPackagingType = async (
	req: any,
	res: Response
): Promise<any> => {
	const userId = req.auth._id
	const data = {
		packagingTypeId: uuid(),
		name: req.body.name
	}
	await create(prisma.packagingType, data)
		.then(async data => {
			const userData = await getById(prisma.user, 'id', userId)

			loguser(
				userData?.id!,
				userData?.name!,
				userData?.role!,
				'Packaging type successfully created!',
				res
			)
			res.status(SC.OK).json({
				message: 'Packaging type successfully created!',
				data
			})
		})
		.catch(err => {
			logger(err, 'ERROR')
			res.status(SC.BAD_REQUEST).json({
				message: 'Failed to create Packaging type'
			})
		})
}

export const updatePackagingType = async (
	req: any,
	res: Response
): Promise<any> => {
	const userId = req.auth._id
	const data = req.body
	const packagingTypeId = req.params.packagingTypeId
	if (!packagingTypeId) {
		res.status(SC.BAD_REQUEST).json({
			message: 'packagingTypeId should be passed as a param!'
		})
		return
	}
	await updateById(
		prisma.packagingType,
		data,
		'packagingTypeId',
		packagingTypeId
	)
		.then(async data => {
			const userData = await getById(prisma.user, 'id', userId)

			loguser(
				userData?.id!,
				userData?.name!,
				userData?.role!,
				'Packaging type updated successfully!',
				res
			)
			res.status(SC.OK).json({
				message: 'Packaging type updated successfully!',
				data
			})
		})
		.catch(err => {
			logger(err, 'ERROR')
			res.status(SC.BAD_REQUEST).json({
				message: 'Failed to update Packaging type'
			})
		})
}

export const deletePackagingType = async (
	req: any,
	res: Response
): Promise<any> => {
	const userId = req.auth._id
	const packagingTypeId = req.params.packagingTypeId
	if (!packagingTypeId) {
		res.status(SC.BAD_REQUEST).json({
			message: 'packagingTypeId should be passed as a param!'
		})
		return
	}
	await deleteById(prisma.packagingType, 'packagingTypeId', packagingTypeId)
		.then(async data => {
			const userData = await getById(prisma.user, 'id', userId)

			loguser(
				userData?.id!,
				userData?.name!,
				userData?.role!,
				'Packaging type deleted successfully!',
				res
			)
			res.status(SC.OK).json({
				message: 'Packaging type deleted successfully!',
				data
			})
		})
		.catch(err => {
			logger(err, 'ERROR')
			res.status(SC.BAD_REQUEST).json({
				message: 'Failed to delete Packaging type'
			})
		})
}

export const getPackagingType = async (
	req: Request,
	res: Response
): Promise<any> => {
	const packagingTypeId = req.params.packagingTypeId
	try {
		await getById(prisma.packagingType, 'packagingTypeId', packagingTypeId)
			.then(data => {
				return res.status(SC.OK).json({
					message: 'Packaging type fetched successfully!',
					data
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to fetch the Packaging type!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get Packaging type API Called!`)
	}
}

export const getAllPackagingTypes = async (
	req: Request,
	res: Response
): Promise<any> => {
	const take = +(req.query.limit || '10'),
		skip = +(req.query.offset || '0')
	try {
		await getAll(prisma.packagingType, take, skip)
			.then(data => {
				return res.status(SC.OK).json({
					message: 'All Packaging types fetched successfully!',
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
					error: 'Failed to fetch Packaging types!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get All Packaging types API Called!`)
	}
}
