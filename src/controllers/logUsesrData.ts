import { Request, Response } from 'express'
import { prisma } from '../prisma/index'
import { statusCode as SC } from '../utils/statusCode'
import { loggerUtil as logger } from '../utils/logger'

export const getAllLogUsersData = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const take = +(req.query.limit || '10')
		const skip = +(req.query.offset || '0')

		const data = await prisma.logUserData.findMany({
			take,
			skip,
			orderBy: {
				timestamp: 'desc'
			}
		})

		if (!data.length) {
			return res.status(SC.NOT_FOUND).json({
				message: 'Log users data not found!'
			})
		}

		return res.status(SC.OK).json({
			message: 'Log users data fetched successfully!',
			data,
			pagination: {
				limit: take,
				offset: skip
			}
		})
	} catch (err: any) {
		logger(err, 'ERROR')
		return res.status(SC.INTERNAL_SERVER_ERROR).json({
			error: 'Failed to fetch log users data!'
		})
	} finally {
		logger('Get All log users data API Called!')
	}
}
