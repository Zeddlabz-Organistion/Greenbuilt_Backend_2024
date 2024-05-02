import { Request, Response } from 'express'
import { prisma } from '../prisma/index'
import { loggerUtil as logger } from '../utils/logger'
import { statusCode as SC } from '../utils/statusCode'

export const getPlugInData = async (
	req: Request,
	res: Response
): Promise<any> => {
	const id = +(req.params.userId || '1')
	try {
		await prisma.user
			.findFirst({
				where: {
					id: id
				}
			})
			.then(user => {
				if (!user) {
					return res.status(SC.NOT_FOUND).json({
						error: "User doesn't exist in DB!"
					})
				}
				const data = user.totalPoints || 1
				const userName = user.name
				return res.status(SC.OK).json({
					message: 'Plugin Data fetched Successfully!',
					data: {
						userName : userName,
						greenEnergyUsed: data,
						co2Offset: data * 2.59,
						waterSaved: data * 0.935
					}
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.INTERNAL_SERVER_ERROR).json({
					message: 'Failed to fetch the user!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get User By Id API Called!`)
	}
}
