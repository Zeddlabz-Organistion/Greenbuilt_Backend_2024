import { Response, Request } from 'express'
import { prisma } from '../prisma/index'
import { loggerUtil as logger } from '../utils/logger'
import { statusCode as SC } from '../utils/statusCode'
import { v4 as uuid } from 'uuid'

export const generateQRCode = async (req: any, res: Response): Promise<any> => {
	const userId = req.auth._id
	const productId = req.params.productId
	const uomUnits: number = +(req.body.uomUnits || '1')

	try {
		await prisma.product
			.findUnique({
				where: {
					productId
				}
			})
			.then(async product => {
				if (!product?.isApproved) {
					res.status(SC.BAD_REQUEST).json({
						error:
							'Given product is not present or not approved to generate QR!'
					})
				} else {
					await prisma.user
						.findUnique({
							where: {
								id: userId
							}
						})
						.then(async user => {
							if ((user?.points || 0) >= (product?.points || 0)) {
								await prisma.user
									.update({
										where: {
											id: user?.id
										},
										data: {
											points: (user?.points || 0) - (product?.points || 0)
										}
									})
									.then(async () => {
										await prisma.qRCode
											.create({
												data: {
													qrId: uuid(),
													productId,
													userId: userId,
													uomValue: uomUnits
												}
											})
											.then(qr => {
												return res.status(SC.OK).json({
													message: 'QR Code generated successfully!',
													data: qr
												})
											})
											.catch(err => {
												logger(err, 'ERROR')
												return res.status(SC.BAD_REQUEST).json({
													error: 'Failed to generate QR code'
												})
											})
									})
							} else {
								res.status(SC.BAD_REQUEST).json({
									error: 'Insufficient points or alloted units to generate QR!'
								})
							}
						})
				}
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Generate QR Code API Called!`)
	}
}

export const generateMultipleQRCodes = async (
	req: any,
	res: Response
): Promise<any> => {
	const userId = req.auth._id
	const productId = req.params.productId
	const unitsToGenerate: number = +(req.body.noOfUnits || '1')
	const uomUnits: number = +(req.body.uomUnits || '1')
	const callId = uuid()
	try {
		await prisma.product
			.findUnique({
				where: {
					productId
				}
			})
			.then(async product => {
				const uomIncludedProductPoints = (product?.points || 1) * uomUnits
				if (!product?.isApproved) {
					res.status(SC.BAD_REQUEST).json({
						error:
							'Given product is not present or not approved to generate QR!'
					})
				} else {
					await prisma.user
						.findUnique({
							where: {
								id: userId
							}
						})
						.then(async user => {
							if ((user?.points || 0) >= (uomIncludedProductPoints || 0)) {
								await prisma.user
									.update({
										where: {
											id: user?.id
										},
										data: {
											points:
												(user?.points || 0) -
												(uomIncludedProductPoints || 0) * unitsToGenerate
										}
									})
									.then(async () => {
										const combinedQrs = new Array()

										for (let i = 0; i < unitsToGenerate; ++i) {
											combinedQrs.push({
												qrId: uuid(),
												productId,
												userId: userId,
												uomValue: uomUnits,
												callId
											})
										}
										await prisma.qRCode
											.createMany({
												data: combinedQrs
											})
											.then(count => {
												return res.status(SC.OK).json({
													message: 'QR Code generated successfully!',
													data: combinedQrs,
													count
												})
											})
											.catch(err => {
												logger(err, 'ERROR')
												return res.status(SC.BAD_REQUEST).json({
													error: 'Failed to generate QR code'
												})
											})
									})
							} else {
								res.status(SC.BAD_REQUEST).json({
									error: 'Insufficient points or alloted units to generate QR!'
								})
							}
						})
				}
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Generate QR Code API Called!`)
	}
}

export const consumeQRCode = async (req: any, res: Response): Promise<any> => {
	const userId = req.auth._id
	const qrId: string = req.params.qrId
	try {
		await prisma.qRCode
			.findUnique({
				where: {
					qrId
				}
			})
			.then(async qr => {
				if (userId === qr?.userId) {
					res.status(SC.BAD_REQUEST).json({
						message: 'Same user cannot consume their own QR codes!'
					})
				} else if (qr?.redeemed) {
					res.status(SC.BAD_REQUEST).json({
						message: 'QR code has been already used!'
					})
				} else {
					await prisma.product
						.findFirst({
							where: {
								productId: qr?.productId || ''
							}
						})
						.then(async product => {
							await prisma.user
								.findUnique({
									where: {
										id: userId
									}
								})
								.then(async user => {
									const pointsConsumed =
										(product?.points || 0) * (qr?.uomValue || 1)
									await prisma.user
										.update({
											where: {
												id: userId
											},
											data: {
												points: (user?.points || 0) + pointsConsumed,
												totalPoints: (user?.totalPoints || 0) + pointsConsumed
											}
										})
										.then(async usr => {
											await prisma.qRCode
												.update({
													where: {
														id: qr?.id
													},
													data: {
														redeemed: true
													}
												})
												.then(async () => {
													await prisma.usedQRCode
														.create({
															data: {
																qrId: qrId,
																userId,
																productId: product?.productId,
																redeemed: true
															}
														})
														.then(() => {
															return res.status(SC.OK).json({
																message: 'QR code consumed successfully',
																pointsConsumed,
																availableUserPoints: usr?.points,
																data: product
															})
														})
														.catch(err => {
															logger(err, 'ERROR')
															return res.status(SC.BAD_REQUEST).json({
																error: 'Failed to consume QR Code!'
															})
														})
												})
										})
								})
						})
				}
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Consume QR Code API Called!`)
	}
}

export const getGeneratedQRs = async (
	req: Request,
	res: Response
): Promise<any> => {
	const userId = +(req.params.userId || '1')
	const redeemed = Boolean(+(req.query?.redeemed || '0'))
	// const take = +(req.query.limit || '10'),
	// 	skip = +(req.query.offset || '0')
	try {
		await prisma.qRCode
			.findMany({
				where: {
					userId: userId,
					redeemed
				}
				// take,
				// skip
			})
			.then(async qr => {
				const arr: object[] = []
				if (!qr.length) {
					res.status(SC.NOT_FOUND).json({
						error: 'No QR found!'
					})
				} else {
					await qr.forEach(
						async data =>
							await prisma.product
								.findUnique({
									where: {
										productId: data.productId || ''
									}
								})
								.then(product => {
									arr.push({
										qrId: data.qrId,
										callId: data.callId,
										isRedeemed: data.redeemed,
										product: product
									})
									const reducedData = arr?.reduce((r: any, acc: any) => {
										r[acc.callId] = r[acc.callId] || []
										r[acc.callId].push(acc)
										return r
									}, Object.create(null))
									if (qr.length === arr.length) {
										res.status(SC.OK).json({
											message: 'Generate QR history fetched successfully!',
											data: reducedData,
											count: arr?.length
										})
									}
								})
								.catch(err => {
									logger(err, 'ERROR')
									res.status(SC.INTERNAL_SERVER_ERROR).json({
										error: 'Failed to fetch Generate QR history'
									})
								})
					)
				}
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get Generated QRs API Called!`)
	}
}

export const getAllGeneratedQRs = async (
	req: Request,
	res: Response
): Promise<any> => {
	// const take = +(req.query.limit || '10'),
	// 	skip = +(req.query.offset || '0')
	try {
		await prisma.qRCode
			.findMany({
				where: {
					...req.body
				}
				// take,
				// skip
			})
			.then(async qr => {
				const arr: object[] = []
				if (!qr.length) {
					res.status(SC.NOT_FOUND).json({
						error: 'No QR found!'
					})
				} else {
					await qr.forEach(
						async data =>
							await prisma.product
								.findUnique({
									where: {
										productId: data.productId || ''
									}
								})
								.then(product => {
									arr.push({
										qrId: data.qrId,
										callId: data.callId,
										isRedeemed: data.redeemed,
										product: product
									})
									const reducedData = arr?.reduce((r: any, acc: any) => {
										r[acc.callId] = r[acc.callId] || []
										r[acc.callId].push(acc)
										return r
									}, Object.create(null))
									if (qr.length === arr.length) {
										res.status(SC.OK).json({
											message: 'Generate QR history fetched successfully!',
											data: reducedData,
											count: arr?.length
										})
									}
								})
								.catch(err => {
									logger(err, 'ERROR')
									res.status(SC.INTERNAL_SERVER_ERROR).json({
										error: 'Failed to fetch Generate QR history'
									})
								})
					)
				}
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get Generated QRs API Called!`)
	}
}

export const getConsumedQRs = async (
	req: Request,
	res: Response
): Promise<any> => {
	const userId = +(req.params.userId || '1')
	const redeemed = req.query?.redeemed
	try {
		await prisma.usedQRCode
			.findMany({
				where: {
					userId: userId,
					redeemed: redeemed === 'true' ? true : undefined
				}
			})
			.then(async qr => {
				if (!qr.length) {
					res.status(SC.NOT_FOUND).json({
						error: 'No QR found!'
					})
				} else {
					const arr: object[] = []
					await qr.forEach(
						async data =>
							await prisma.product
								.findUnique({
									where: {
										productId: data.productId || ''
									}
								})
								.then(product => {
									arr.push({
										qrId: data.qrId,
										isRedeemed: data.redeemed,
										product: product
									})
									if (qr.length === arr.length) {
										res.status(SC.OK).json({
											message: 'Consume QR history fetched successfully!',
											data: arr,
											count: arr?.length
										})
									}
								})
								.catch(err => {
									logger(err, 'ERROR')
									res.status(SC.INTERNAL_SERVER_ERROR).json({
										error: 'Failed to fetch consumed QR history'
									})
								})
					)
				}
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get Consumed QRs API Called!`)
	}
}

export const getAllConsumedQRs = async (
	req: Request,
	res: Response
): Promise<any> => {
	const take = +(req.query.limit || '10'),
		skip = +(req.query.offset || '0')
	try {
		await prisma.usedQRCode
			.findMany({
				where: {
					...req.body
				},
				take,
				skip
			})
			.then(async qr => {
				if (!qr.length) {
					res.status(SC.NOT_FOUND).json({
						error: 'No QR found!'
					})
				} else {
					const arr: object[] = []
					await qr.forEach(
						async data =>
							await prisma.product
								.findUnique({
									where: {
										productId: data.productId || ''
									}
								})
								.then(product => {
									arr.push({
										qrId: data.qrId,
										isRedeemed: data.redeemed,
										product: product
									})
									if (qr.length === arr.length) {
										res.status(SC.OK).json({
											message: 'Consume QR history fetched successfully!',
											data: arr,
											count: arr?.length
										})
									}
								})
								.catch(err => {
									logger(err, 'ERROR')
									res.status(SC.INTERNAL_SERVER_ERROR).json({
										error: 'Failed to fetch consumed QR history'
									})
								})
					)
				}
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get Consumed QRs API Called!`)
	}
}

export const getAllQRsByQuery = async (
	req: Request,
	res: Response
): Promise<any> => {
	const take = +(req.query.limit || '10'),
		skip = +(req.query.offset || '0')
	const query = req.body
	try {
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
					message: 'All Qrs fetched successfully!',
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
					error: 'Failed to fetch the QRs!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get All QRs by Query API Called!`)
	}
}

export const getQRBySearchTerm = async (
	req: any,
	res: Response
): Promise<any> => {
	const take = +(req.query.limit || '10'),
		skip = +(req.query.offset || '0')
	const userId = +(req.auth._id || '')
	const { key = '', value = '' } = req.body
	try {
		await prisma.qRCode
			.findMany({
				where: {
					[key]: {
						contains: value
					},
					userId
				},
				take,
				skip
			})
			.then(data => {
				return res.status(SC.OK).json({
					message: 'All searched QRs fetched successfully!',
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
					error: 'Failed to fetch the QRs!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get All QRs by Search term API Called!`)
	}
}
