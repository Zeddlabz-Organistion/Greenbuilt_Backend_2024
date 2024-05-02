import { Request, Response } from 'express'
import { prisma } from '../prisma/index'
import { loggerUtil as logger } from '../utils/logger'
import { statusCode as SC } from '../utils/statusCode'

export const getAllAdminStatistics = async (
	_: Request,
	res: Response
): Promise<any> => {
	try {
		const responseObj = {
			userCount: 0,
			businessUserCount: 0,
			totalEndUsers: 0,
			totalProducts: 0,
			totalAssets: 0,
			totalQRGenerated: 0,
			totalQRConsumed: 0,
			totalIndustryTypes: 0,
			totalSourceTypes: 0
		}

		await prisma.user
			.count({
				where: {
					role: 1
				}
			})
			.then(async user => {
				responseObj.userCount = user

				await prisma.user
					.count({
						where: {
							role: 2
						}
					})
					.then(async corp => {
						responseObj.businessUserCount = corp

						await await prisma.user.count({}).then(async endUsers => {
							responseObj.totalEndUsers = endUsers

							await prisma.product.count({}).then(async products => {
								responseObj.totalProducts = products

								await prisma.asset.count({}).then(async assets => {
									responseObj.totalAssets = assets

									await prisma.qRCode.count({}).then(async qrCodes => {
										responseObj.totalQRGenerated = qrCodes

										await prisma.usedQRCode
											.count({})
											.then(async userQrCodes => {
												responseObj.totalQRConsumed = userQrCodes

												await prisma.industryType
													.count({})
													.then(async industryTypes => {
														responseObj.totalIndustryTypes = industryTypes
														await prisma.sourceType
															.count({})
															.then(sourceTypes => {
																responseObj.totalSourceTypes = sourceTypes

																return res.status(SC.OK).json({
																	message: 'Statistics fetched Successfully!',
																	data: responseObj
																})
															})
															.catch(err => {
																logger(err, 'ERROR')
																return res.status(SC.BAD_REQUEST).json({
																	error: 'Failed to fetch statistics data!'
																})
															})
													})
											})
									})
								})
							})
						})
					})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.INTERNAL_SERVER_ERROR).json({
					message: 'Failed to fetch the statistics!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get User By Id API Called!`)
	}
}

export const getAllCorporateStatistics = async (
	req: any,
	res: Response
): Promise<any> => {
	try {
		const responseObj = {
			availablePoints: 0,
			totalPoints: 0,
			totalProducts: 0,
			totalQRGenerated: 0,
			totalQRConsumed: 0
		}
		const id = req.auth._id
		await prisma.user
			.findUnique({
				where: {
					id
				}
			})
			.then(async user => {
				responseObj.availablePoints = user?.points || 0
				responseObj.totalPoints = user?.totalPoints || 0

				await prisma.product
					.count({
						where: {
							userId: id
						}
					})
					.then(async products => {
						responseObj.totalProducts = products

						await prisma.qRCode
							.count({
								where: {
									userId: id
								}
							})
							.then(async qrCodes => {
								responseObj.totalQRGenerated = qrCodes

								await prisma.usedQRCode
									.count({
										where: {
											userId: id
										}
									})
									.then(async userQrCodes => {
										responseObj.totalQRConsumed = userQrCodes
										return res.status(SC.OK).json({
											message: 'Statistics fetched Successfully!',
											data: responseObj
										})
									})
									.catch(err => {
										logger(err, 'ERROR')
										return res.status(SC.BAD_REQUEST).json({
											error: 'Failed to fetch statistics data!'
										})
									})
							})
					})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.INTERNAL_SERVER_ERROR).json({
					message: 'Failed to fetch the statistics!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get User By Id API Called!`)
	}
}
