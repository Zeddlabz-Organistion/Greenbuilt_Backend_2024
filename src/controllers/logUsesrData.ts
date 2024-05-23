import { Request, Response } from 'express'
import { prisma } from '../prisma/index'
import { getAll } from '../helpers/crud'
import { statusCode as SC } from '../utils/statusCode'
import { loggerUtil as logger } from '../utils/logger'
export const getAllLogUsersData = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const take = +(req.query.limit || '10'),
			skip = +(req.query.offset || '0')
		await getAll(prisma.logUserData, take, skip)
			.then(data => {
				if (!data?.length) {
					return res.status(SC.OK).json({
						message: 'log users data not found!'
					})
				}
				return res.status(SC.OK).json({
					message: 'log users data fetched successfully!',
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
