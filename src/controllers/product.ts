import { generateDocumentId } from './../utils/generateId'
import { Request, Response } from 'express'
import { prisma } from '../prisma/index'
import { loggerUtil as logger } from '../utils/logger'
import { statusCode as SC } from '../utils/statusCode'
import { v4 as uuid } from 'uuid'
import {
	create,
	createMany,
	deleteById,
	getAllById,
	getById,
	updateById
} from '../helpers/crud'
import { loguser } from '../helpers/logUser'

interface Product {
	title: string
	industryType: string
	packagingType?: string
	uom: string
	description?: string
	points: number
	photo?: string
	productId: string
	productCode: String
	userId: number
}

export const createProduct = async (req: any, res: Response): Promise<any> => {
	const userId = req.auth._id
	// console.log("this is userid",userId);
	const product: Product = req.body.product
	// console.log("this is product",req.body);
	const data = {
		...product,
		productId: uuid(),
		userId
	}
	// console.log("this is data",data);
	try {
		const userData = await prisma.user.findUnique({
			where: { id: userId }
		})
		await prisma.product
			.findMany({
				where: { userId: userId }
			})
			.then(async data => {
				data.forEach(prod => {
					if (
						prod.title.trim().toLowerCase() ==
						product.title.trim().toLowerCase()
					) {
						return res.status(SC.BAD_REQUEST).json({
							message: 'Product with the same name already exists.'
						})
					}
					return
				})
				return
			})
		await prisma.product
			.count({
				where: {
					userId: userId
				}
			})
			.then(async count => {
				const prefix = product.industryType?.substring(0, 3)?.toUpperCase()
				const finalData = {
					...data,
					productCode: prefix + generateDocumentId(count, 4)
				}
				await create(prisma.product, finalData).then(async data => {
					await prisma.notification
						.create({
							data: {
								notificationId: uuid(),
								date: new Date().getDate(),
								month: new Date().getMonth() + 1,
								year: new Date().getFullYear(),
								fullDate: new Date(),
								text: `Product - ${product.title} has been created!`,
								userId
							}
						})
						.then(() => {
							loguser(
								userData?.id!,
								userData?.name!,
								userData?.role!,
								`${product.title} has been created!`,
								res
							)
							return res.status(SC.OK).json({
								message: 'Product created successfully!',
								data
							})
						})
						.catch(err => {
							logger(err, 'ERROR')
							return res.status(SC.BAD_REQUEST).json({
								error: 'Product creation failed!'
							})
						})
				})
			})
			.catch(() => {
				return res.status(SC.BAD_REQUEST).json({
					error: 'Product creation failed!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Create Product API Called!`)
	}
}

export const bulkUpload = async (req: any, res: Response): Promise<any> => {
	const userId = req.auth._id
	const products: Product[] = req.body.products
	const data = products?.map(val => ({ ...val, productId: uuid(), userId }))
	const titlesWithQuotes = data.map(item => `'${item.title}'`).join(", ");
	try {
		const userData = await prisma.user.findUnique({
			where: { id: userId }
		})
		await createMany(prisma.product, data)
			.then(data => {
				loguser(
					userData?.id!,
					userData?.name!,
					userData?.role!,
					`${titlesWithQuotes} Products updated in bulk successfully!`,
					res
				)
				return res.status(SC.OK).json({
					message: 'Products updated in bulk successfully!',
					data
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Products upload failed!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Bulk upload Product API Called!`)
	}
}

export const deleteProduct = async (
	req: any,
	res: Response
): Promise<any> => {
	const userId = req.auth._id
	const productId = req.params.productId
	try {
		const userData = await prisma.user.findUnique({
			where: { id: userId }
		})
		// console.log("this is userdata",userData);
		await getById(prisma.product, 'productId', productId)
			.then(async product => {
				if (!product.isApproved) {
					// console.log("nikhilgupta",product);
					await deleteById(prisma.product, 'productId', productId)
						.then(data => {
							loguser(
								userData?.id!,
								userData?.name!,
								userData?.role!,
								`${data.title} Product deleted successfully!`,
								res
							)
							return res.status(SC.OK).json({
								message: 'Product deleted successfully!',
								data
							})
						})
						.catch(err => {
							logger(err, 'ERROR')
							return res.status(SC.BAD_REQUEST).json({
								error: 'Product deletion failed!'
							})
						})
				} else {
					return res.status(SC.BAD_REQUEST).json({
						error: 'Product has been Approved.'
					})
				}
				return res.status(SC.BAD_REQUEST).json({
					error: 'Product has been Approved.'
				})
			})
			.catch(() => {
				return res.status(SC.BAD_REQUEST).json({
					error: 'Product deletion failed!'
				})
			})
			.finally(() => {
				return res.status(SC.BAD_REQUEST).json({ error: 'Error' })
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Delete Product API Called!`)
	}
}

export const getProduct = async (req: Request, res: Response): Promise<any> => {
	const productId = req.params.productId
	try {
		await getById(prisma.product, 'productId', productId)
			.then(data => {
				return res.status(SC.OK).json({
					message: 'Corporate Product fetched successfully!',
					data
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to fetch the corporate product!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get Corporate Product API Called!`)
	}
}

export const getAllCorporateProducts = async (
	req: any,
	res: Response
): Promise<any> => {
	const userId = req.auth._id
	const take = +(req.query.limit || '10'),
		skip = +(req.query.offset || '0')
	try {
		await getAllById(prisma.product, 'userId', userId, take, skip)
			.then(data => {
				return res.status(SC.OK).json({
					message: 'Corporate Products fetched successfully!',
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
					error: 'Failed to fetch the corporate products!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get All Corporate Products API Called!`)
	}
}

export const getAllProducts = async (
	req: Request,
	res: Response
): Promise<any> => {
	const take = +(req.query.limit || '10'),
		skip = +(req.query.offset || '0')
	try {
		await prisma.product
			.findMany({ include: { user: true }, take, skip })
			.then(data => {
				return res.status(SC.OK).json({
					message: 'All Products fetched successfully!',
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
		logger(`Get All Products API Called!`)
	}
}

export const approveProduct = async (
	req: Request,
	res: Response
): Promise<any> => {
	const productId = req.params.productId
	const data = {
		isApproved: true
	}
	try {
		await updateById(prisma.product, data, 'productId', productId).then(
			async data => {
				await prisma.notification
					.create({
						data: {
							notificationId: uuid(),
							date: new Date().getDate(),
							month: new Date().getMonth() + 1,
							year: new Date().getFullYear(),
							fullDate: new Date(),
							text: `Product - ${data.title} has been approved!`,
							userId: data?.userId
						}
					})
					.then(() => {
						return res.status(SC.OK).json({
							message: 'Product approved successfully!',
							data
						})
					})
					.catch(err => {
						logger(err, 'ERROR')
						return res.status(SC.BAD_REQUEST).json({
							error: 'Product approval failed!'
						})
					})
			}
		)
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Approve Product API Called!`)
	}
}

export const updateProductPoints = async (
	req: Request,
	res: Response
): Promise<any> => {
	const id = +(req.params.productId || 0)
	const points =
		typeof req.body.points === 'string'
			? +(req.body.points || 0)
			: req.body.points || 0

	try {
		await getById(prisma.product, 'id', id)
			.then(async product => {
				const data = {
					points: points
				}
				await updateById(prisma.product, data, 'productId', product?.productId)
					.then(data => {
						return res.status(SC.OK).json({
							message: 'Product updated successfully!',
							data
						})
					})
					.catch(err => {
						logger(err, 'ERROR')
						return res.status(SC.BAD_REQUEST).json({
							error: 'Product approval failed!'
						})
					})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.NOT_FOUND).json({
					error: 'NO product found!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Approve Product API Called!`)
	}
}

export const getAllProductsByQuery = async (
	req: Request,
	res: Response
): Promise<any> => {
	const take = +(req.query.limit || '10'),
		skip = +(req.query.offset || '0')
	const queryFromArray = +(req.query.queryFromArray || '0')
	const query = req.body
	try {
		if (!queryFromArray) {
			await prisma.product
				.findMany({
					where: {
						...query
					},
					take,
					skip
				})
				.then(data => {
					return res.status(SC.OK).json({
						message: 'All Products fetched successfully!',
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
		} else {
			await prisma.product
				.findMany({
					where: {
						uom: {
							in: req.body.uom || []
						},
						packagingType: {
							hasSome: req.body.packagingType || []
						},
						industryType: {
							in: req.body.industryType || []
						}
					}
				})
				.then(data => {
					return res.status(SC.OK).json({
						message: 'All Products fetched successfully!',
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
		}
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get All Products API Called!`)
	}
}

export const getProductsBySearchTerm = async (
	req: any,
	res: Response
): Promise<any> => {
	const take = +(req.query.limit || '10'),
		skip = +(req.query.offset || '0')
	const userId = +(req.auth._id || '')
	const { key = '', value = '' } = req.body
	try {
		await prisma.product
			.findMany({
				where: {
					[key]: {
						contains: value,
						mode: 'insensitive'
					},
					userId
				},
				take,
				skip
			})
			.then(data => {
				return res.status(SC.OK).json({
					message: 'All Products fetched successfully!',
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
		logger(`Get All Products API Called!`)
	}
}
