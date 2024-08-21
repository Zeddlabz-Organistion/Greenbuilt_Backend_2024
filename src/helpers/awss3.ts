import {
	S3Client,
	PutObjectCommand,
	GetObjectCommand
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { ISignedResult } from '../@types/types'

const s3Client = new S3Client({
	region: process.env.AWS_S3_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY!,
		secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY!
	}
})

export async function getSignedUrlForDocs(
	folderName: string,
	fileName: string,
	userId: number
): Promise<ISignedResult> {
	const key: string = `${folderName}/${userId}_${fileName}`
	const params = {
		Bucket: process.env.AWS_S3_BUCKET!,
		Key: key,
		ContentType: 'document/*'
	}

	try {
		const command = new PutObjectCommand(params)
		const url: string = await getSignedUrl(s3Client, command)
		if (!url || !key) {
			throw new Error('Failed to generate signed URL or key')
		}
		return { url, key }
	} catch (error) {
		console.error('Error generating signed URL for document:', error)
		throw new Error('Could not generate signed URL')
	}
}

export const getObjectUrl = async (key: string): Promise<string> => {
	const params = {
		Bucket: process.env.AWS_S3_BUCKET!,
		Key: key,
		Expires: 15 * 60
	}

	try {
		const command = new GetObjectCommand(params)
		const url: string = await getSignedUrl(s3Client, command)
		if (!url) {
			throw new Error('Failed to generate signed URL')
		}
		return url
	} catch (error) {
		console.error('Error generating signed URL for object:', error)
		throw new Error('Could not generate signed URL')
	}
}
