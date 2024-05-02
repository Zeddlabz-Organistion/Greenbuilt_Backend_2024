import { Request, Response } from 'express'
import AWS from 'aws-sdk'
import formidable from 'formidable'
import fs from 'fs'
import sharp from 'sharp'
import { prisma } from '../prisma/index'
import { loggerUtil as logger } from '../utils/logger'
import { statusCode as SC } from '../utils/statusCode'
import { v4 as uuid } from 'uuid'
import { isEmpty } from 'lodash'
import {
	create,
	deleteById,
	getById,
	updateById
	// getAllById
} from '../helpers/crud'

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
	region: 'ap-south-1'
})

export const uploadDocument = async (
	req: Request,
	res: Response
): Promise<any> => {
	const userId = +(req.params.userId || '0')
	try {
		const form = new formidable.IncomingForm()
		form.parse(req, (err: any, fields: any, { file }: any) => {
			if (err) {
				logger(err, 'ERROR')
				res.status(SC.BAD_REQUEST).json({
					error: 'Problem with document'
				})
			}
			if (file.size > 3000000) {
				res.status(SC.BAD_REQUEST).json({
					error: 'File size should be less than 3 MB'
				})
			} else {
				const { title } = fields
				console.log(file)
				const dataS3 = {
					Bucket: 'green-built-documents',
					Key: `${title}-${userId}`,
					Body: fs.createReadStream(file.filepath),
					ContentType: file.mimetype
				}
				const data = {
					title: `${title}`,
					docId: uuid(),
					uploadDate: new Date(),
					fileName: file.originalFilename,
					userId,
					location: ''
				}
				logger('Hello world')
				s3.upload(dataS3, (err: any, response: any) => {
					if (err) {
						logger('ERROR')
						logger(err)
						return res.status(SC.BAD_REQUEST).json({
							error: 'Error while uploading document'
						})
					} else {
						logger('File Uploaded Successfully')
						data.location = response.Location
						create(prisma.document, data)
							.then(async responseData => {
								await prisma.user
									.update({
										where: {
											id: userId
										},
										data: {
											documentArray: { push: response.Location }
										}
									})
									.then(USER => {
										return res.status(SC.OK).json({
											message: 'Document uploaded sucessfully!',
											data: responseData,
											USER
										})
									})
									.catch(err => {
										logger(err, 'ERROR')
										res.status(SC.BAD_REQUEST).json({
											error: 'Error while uploading Document'
										})
									})
							})
							.catch(err => {
								logger(err, 'ERROR')
								return res.status(SC.BAD_REQUEST).json({
									error: 'Error while uploading document'
								})
							})
					}
					return
				})
			}
		})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Upload document API Called!`)
	}
}

export const updateDocument = async (
	req: Request,
	res: Response
): Promise<any> => {
	const docId = req.params.docId
	try {
		const form = new formidable.IncomingForm()
		await form.parse(req, async (err: any, fields: any, { file }: any) => {
			if (err) {
				logger(err, 'ERROR')
				res.status(SC.BAD_REQUEST).json({
					error: 'Problem with document'
				})
			}
			const { title } = fields
			if (file) {
				if (file.size > 3000000) {
					res.status(SC.BAD_REQUEST).json({
						error: 'File size should be less than 3 MB'
					})
				}
				sharp(fs.readFileSync(file.filepath))
					.resize(1000)
					.toBuffer()
					.then(async doc => {
						const data = {
							file: doc,
							fileName: file.originalFilename
						} as any
						if (!isEmpty(title)) data.title = title

						await updateById(prisma.document, data, 'docId', docId)
							.then(data => {
								return res.status(SC.OK).json({
									message: 'Document updated sucessfully!',
									data: data
								})
							})
							.catch(err => {
								logger(err, 'ERROR')
								return res.status(SC.BAD_REQUEST).json({
									error: 'Error while updating document'
								})
							})
					})
			} else if (title) {
				await await updateById(prisma.document, { title }, 'docId', docId)
					.then(data => {
						return res.status(SC.OK).json({
							message: 'Document updated sucessfully!',
							data: data
						})
					})
					.catch(err => {
						logger(err, 'ERROR')
						return res.status(SC.BAD_REQUEST).json({
							error: 'Error while updating document'
						})
					})
			}
		})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Update document API Called!`)
	}
}

export const deleteDocument = async (
	req: Request,
	res: Response
): Promise<any> => {
	const docId = req.params.docId
	try {
		await deleteById(prisma.document, 'docId', docId)
			.then(() => {
				return res.status(SC.OK).json({
					message: 'Document deleted sucessfully!'
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Error while deleting document'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
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
		await getById(prisma.document, 'docId', docId)
			.then(data => {
				if (isEmpty(data)) {
					return res.status(SC.NOT_FOUND).json({
						message: 'No document was found!'
					})
				}
				return res.status(SC.OK).json({
					message: 'Document fetched sucessfully!',
					data: data
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Error while fetching document'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
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
