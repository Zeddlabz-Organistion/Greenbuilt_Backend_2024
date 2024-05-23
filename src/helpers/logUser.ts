import { Response } from 'express'
import { prisma } from '../prisma/index'
import { UserType } from '../@types/enum'
import { create } from './crud'
import { statusCode as SC } from '../utils/statusCode'
export const loguser = async (
	userId: number,
	name: string,
	role: number,
	operation: string,
	res: Response
): Promise<any> => {
	try {
		let userrole
		if (role == UserType.USER) {
			userrole = 'app user'
		} else if (role == UserType.CORPORATEUSER) {
			userrole = 'Corporate user'
		} else {
			userrole = 'Admin'
		}
		const data = {
			userId,
			name,
			role: userrole,
			operation
		}
		await create(prisma.logUserData, data)
	} catch (error) {
		return res
			.status(SC.INTERNAL_SERVER_ERROR)
			.json({ error: 'Internal Server Error' })
	}
}
