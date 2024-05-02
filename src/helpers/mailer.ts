import { Response } from 'express'
import { loggerUtil as logger } from '../utils/logger'
import { statusCode as SC } from '../utils/statusCode'
import nodemailer from 'nodemailer'

export const mailer = async (
	mail: string,
	subject: string,
    textMessage : string,
    html : string,
	_: any,
	res: Response
): Promise<any> => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		pool: true,
		secure: true,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS
		}
	})
	let mailOptions = {
		from: '"Green Built" <verify@greenbuilt.in>',
		to: mail,
		subject: subject,
		text: textMessage,
		html: html
	}
	transporter
		.sendMail(mailOptions)
		.then(info => {
			res.status(SC.OK).json({
				message: 'Message sent successfully!'
			})
			logger(`Message sent: ${info.messageId}`)
		})
		.catch(error => {
			logger(error, 'ERROR')
			res.status(SC.BAD_REQUEST).json({
				error: 'Forgot Password failed!'
			})
		})
}
