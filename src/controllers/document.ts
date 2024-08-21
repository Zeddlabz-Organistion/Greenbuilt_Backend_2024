import { Request, Response } from 'express'
import formidable from 'formidable'
import fs from 'fs'
import sharp from 'sharp'
import { prisma } from '../prisma/index'
import { loggerUtil as logger } from '../utils/logger'
import { statusCode as SC } from '../utils/statusCode'
import { v4 as uuid } from 'uuid'
import { isEmpty } from 'lodash'
import { getObjectUrl } from '../helpers/awss3'
import {
	create,
	deleteById,
	getById,
	updateById
	// getAllById
} from '../helpers/crud'
import { getSignedUrlForDocs } from '../helpers/awss3'
import { loguser } from '../helpers/logUser'

export const uploadDocument = async (req: any, res: Response): Promise<any> => {
	const userId = Number(req.params.userId || '0')

	try {
		const { fileName, title } = req.body
		const { url, key } = await getSignedUrlForDocs('document', fileName, userId)
		const data = {
			title: title,
			docId: uuid(),
			uploadDate: new Date(),
			fileName: fileName,
			userId: userId,
			location: key
		}

		try {
			await create(prisma.document, data)
			const user = await prisma.user.update({
				where: { id: userId },
				data: { documentArray: { push: key } }
			})
			loguser(user.id, user.name, user.role!, 'Document upload initiated', res)
			return res.status(200).json({
				message: 'Signed URL generated successfully',
				url
			})
		} catch (updateError) {
			if (updateError instanceof Error) {
				logger(updateError.message, 'ERROR')
			} else {
				logger('Unknown error during document update', 'ERROR')
			}
			return res
				.status(400)
				.json({ error: 'Error while updating document information' })
		}
	} catch (err) {
		if (err instanceof Error) {
			logger(err.message, 'ERROR')
		} else {
			logger('Unknown error during signed URL generation', 'ERROR')
		}
		return res.status(500).json({ error: 'Internal server error' })
	} finally {
		logger('Upload document API Called!')
	}
}

export const updateDocument = async (req: any, res: Response): Promise<any> => {
	const docId = req.params.docId
	try {
		const form = new formidable.IncomingForm()

		form.parse(req, async (err: any, fields: any, files: any) => {
			if (err) {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Problem with document'
				})
			}
			const { title } = fields
			const file = files.file

			if (file) {
				if (file.size > 3000000) {
					return res.status(SC.BAD_REQUEST).json({
						error: 'File size should be less than 3 MB'
					})
				}

				try {
					const doc = await sharp(fs.readFileSync(file.filepath))
						.resize(1000)
						.toBuffer()

					const data: any = {
						file: doc,
						fileName: file.originalFilename
					}
					if (title) data.title = title

					const updatedDocument = await updateById(
						prisma.document,
						data,
						'docId',
						docId
					)
					const userData = await getById(prisma.user, 'id', req.auth._id)

					loguser(
						userData?.id!,
						userData?.name!,
						userData?.role!,
						`Document updated successfully. document id is ${docId}`,
						res
					)

					return res.status(SC.OK).json({
						message: 'Document updated successfully!',
						data: updatedDocument
					})
				} catch (err: any) {
					logger(err, 'ERROR')
					return res.status(SC.BAD_REQUEST).json({
						error: 'Error while updating document'
					})
				}
			} else if (title) {
				try {
					const updatedDocument = await updateById(
						prisma.document,
						{ title },
						'docId',
						docId
					)
					const userData = await getById(
						prisma.user,
						'id',
						updatedDocument.userId
					)

					loguser(
						userData?.id!,
						userData?.name!,
						userData?.role!,
						`Document updated successfully!`,
						res
					)

					return res.status(SC.OK).json({
						message: 'Document updated successfully!',
						data: updatedDocument
					})
				} catch (err: any) {
					logger(err, 'ERROR')
					return res.status(SC.BAD_REQUEST).json({
						error: 'Error while updating document'
					})
				}
			} else {
				return res.status(SC.BAD_REQUEST).json({
					error: 'No file or title provided'
				})
			}
		})
	} catch (err: any) {
		logger(err, 'ERROR')
		return res.status(SC.INTERNAL_SERVER_ERROR).json({
			error: 'Internal server error'
		})
	} finally {
		logger(`Update document API Called!`)
	}
}

export const deleteDocument = async (req: any, res: Response): Promise<any> => {
	const userId = req.auth._id
	const docId = req.params.docId
	try {
		await deleteById(prisma.document, 'docId', docId)
		const userData = await getById(prisma.user, 'id', userId)

		loguser(
			userData?.id!,
			userData?.name!,
			userData?.role!,
			`Document deleted successfully!`,
			res
		)

		return res.status(SC.OK).json({
			message: 'Document deleted successfully!'
		})
	} catch (err: any) {
		logger(err, 'ERROR')
		return res.status(SC.BAD_REQUEST).json({
			error: 'Error while deleting document'
		})
	} finally {
		logger(`Delete document API Called!`)
	}
}

export const getDocumentById = async (
	req: Request,
	res: Response
): Promise<any> => {
	const docId = req.params.docId

	try {
		const data = await getById(prisma.document, 'docId', docId)

		if (isEmpty(data)) {
			return res.status(SC.NOT_FOUND).json({
				message: 'No document was found!'
			})
		}
		const url = await getObjectUrl(data.location)
		data.url = url
		return res.status(SC.OK).json({
			message: 'Document fetched successfully!',
			data: data
		})
	} catch (err: any) {
		logger(err, 'ERROR')
		return res.status(SC.BAD_REQUEST).json({
			error: 'Error while fetching document'
		})
	} finally {
		logger(`Get document API Called!`)
	}
}

export const getAllDocumentsByUser = async (
	req: Request,
	res: Response
): Promise<any> => {
	const userId = +(req.params.userId || '0')
	// const take = +(req.query.limit || '10'),
	// 	skip = +(req.query.offset || '0')
	try {
		await prisma.document
			.findMany({ where: { userId: userId }, include: { user: true } })
			.then(data => {
				if (isEmpty(data)) {
					return res.status(SC.NOT_FOUND).json({
						message: 'No document was found!'
					})
				}
				return res.status(SC.OK).json({
					message: 'User Document fetched sucessfully!',
					data: data
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Error while fetching user documents'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Get user documents API Called!`)
	}
}
