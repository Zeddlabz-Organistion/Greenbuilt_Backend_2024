import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { validationResult as validate } from 'express-validator'
import { isEmpty, omit } from 'lodash'
import { authenticate, hashPassword } from '../helpers/auth'
import { prisma } from '../prisma/index'
import { loggerUtil as logger } from '../utils/logger'
import { statusCode as SC } from '../utils/statusCode'
import { Gender } from '../@types/enum'
import { mailer } from '../helpers/mailer'
import { loguser } from '../helpers/logUser'

export const signup = async (req: Request, res: Response): Promise<any> => {
	const errors = validate(req) || []
	if (!errors.isEmpty()) {
		return res.status(SC.WRONG_ENTITY).json({
			error: errors.array()[0]?.msg
		})
	}

	const { name, email, phoneNumber = null, password } = req.body
	const otherFields = omit(req.body, 'password')
	const userType = req.query?.userType
	try {
		await prisma.user
			.create({
				data: {
					name,
					email,
					phoneNumber,
					gender: req.body?.gender || Gender.MALE,
					dateOfBirth: req.body?.dataOfBirth || '',
					encrypted_password: hashPassword(password, process.env.SALT || ''),
					role: userType && userType === '2' ? 2 : 1,
					...otherFields
				}
			})
			.then(user => {
				loguser(user.id, name, user.role || 1, 'User Signed Up', res)
				return res.status(SC.OK).json({
					message: 'User Signed Up, Successfully!',
					data: user
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.BAD_REQUEST).json({
					error: 'Failed to add user in DB!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Sign up API called by user - ${email}`)
	}
}

export const signin = async (req: Request, res: Response): Promise<any> => {
	const errors = validate(req) || []
	if (!errors.isEmpty()) {
		return res.status(SC.WRONG_ENTITY).json({
			error: errors.array()[0]?.msg
		})
	}

	const { email, password } = req.body
	try {
		await prisma.user
			.findUnique({
				where: {
					email
				}
			})
			.then(user => {
				if (!user) {
					return res.status(SC.NOT_FOUND).json({
						error: "User doesn't exist!"
					})
				}
				if (
					!authenticate(
						password,
						process.env.SALT || '',
						user.encrypted_password
					)
				) {
					return res.status(SC.UNAUTHORIZED).json({
						error: 'Oops!, E-mail or Password is  incorrect!'
					})
				}
				const expiryTime = new Date()
				expiryTime.setMonth(expiryTime.getMonth() + 6)
				const exp = expiryTime.getTime() / 1000
				const token = jwt.sign(
					{ _id: user.id, exp: exp },
					process.env.SECRET || ''
				)
				res.cookie('Token', token, {
					expires: new Date(Date.now() + 900000),
					httpOnly: true
				})
				loguser(user.id, user.name, user.role!, 'User Logged in', res)
				return res.status(SC.OK).json({
					message: 'User Logged in Successfully!',
					token,
					data: user
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.INTERNAL_SERVER_ERROR).json({
					error: 'Login failed!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Sign in API called by user - ${email}`)
	}
}

export const signout = (res: Response): void => {
	res.clearCookie('Token')
	res.status(SC.OK).json({
		message: 'User Signed Out Sucessfully!'
	})
}

export const update = async (req: Request, res: Response): Promise<any> => {
	const userId = +(req.params.userId || '0')

	const reqBody = req.body
	const { email = '', password = '' } = req.body
	try {
		if (!isEmpty(email) || !isEmpty(password)) {
			return res.status(SC.BAD_REQUEST).json({
				error: 'Cannot update email or password'
			})
		}
		await prisma.user
			.update({
				where: {
					id: userId
				},
				data: reqBody
			})
			.then(user => {
				loguser(user.id, user.name, user.role!, 'User Updated Successfully', res)
				return res.status(SC.OK).json({
					message: 'User Updated Successfully',
					data: user
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.INTERNAL_SERVER_ERROR).json({
					error: 'Login failed!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Update API called!`)
	}
}

export const approveCorporateUser = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const userId = +(req.params.userId || '0')
		await prisma.user
			.update({
				where: {
					id: userId
				},
				data: {
					isApproved: true
				}
			})
			.then(user => {
				mailer(
					user.email,
					'Congratulations You have been Approved!',
					'You Have Been Approvedr',
					`<!DOCTYPE html>
					<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
					
					<head>
						<title></title>
						<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
						<!--[if !mso]><!-->
						<link href="https://fonts.googleapis.com/css?family=Droid+Serif" rel="stylesheet" type="text/css">
						<link href="https://fonts.googleapis.com/css?family=Abril+Fatface" rel="stylesheet" type="text/css">
						<!--<![endif]-->
						<style>
							* {
								box-sizing: border-box;
							}
					
							body {
								margin: 0;
								padding: 0;
							}
					
							a[x-apple-data-detectors] {
								color: inherit !important;
								text-decoration: inherit !important;
							}
					
							#MessageViewBody a {
								color: inherit;
								text-decoration: none;
							}
					
							p {
								line-height: inherit
							}
					
							.desktop_hide,
							.desktop_hide table {
								mso-hide: all;
								display: none;
								max-height: 0px;
								overflow: hidden;
							}
					
							@media (max-width:700px) {
								.desktop_hide table.icons-inner {
									display: inline-block !important;
								}
					
								.icons-inner {
									text-align: center;
								}
					
								.icons-inner td {
									margin: 0 auto;
								}
					
								.image_block img.big,
								.row-content {
									width: 100% !important;
								}
					
								.mobile_hide {
									display: none;
								}
					
								.stack .column {
									width: 100%;
									display: block;
								}
					
								.mobile_hide {
									min-height: 0;
									max-height: 0;
									max-width: 0;
									overflow: hidden;
									font-size: 0px;
								}
					
								.desktop_hide,
								.desktop_hide table {
									display: table !important;
									max-height: none !important;
								}
							}
						</style>
					</head>
					
					<body style="background-color: #b8f6c2; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
						<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #b8f6c2;">
							<tbody>
								<tr>
									<td>
										<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
											<tbody>
												<tr>
													<td>
														<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680">
															<tbody>
																<tr>
																	<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
																		<table class="image_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<tr>
																				<td style="padding-bottom:20px;padding-top:10px;width:100%;padding-right:0px;padding-left:0px;">
																					<div align="center" style="line-height:10px"><a href="www.example.com" target="_blank" style="outline:none" tabindex="-1"><img class="big" src="https://raw.githubusercontent.com/IamLucidDreamer/greenbuilt-web-crm-admin/main/src/assets/logoGreenbuilt.png" style="display: block; height: auto; border: 0; width: 408px; max-width: 100%;" width="408" alt="Company Logo" title="Company Logo"></a></div>
																				</td>
																			</tr>
																		</table>
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
										<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-position: center top;">
											<tbody>
												<tr>
													<td>
														<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #5091c4; color: #000000; width: 680px;" width="680">
															<tbody>
																<tr>
																	<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
																		<table class="image_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<tr>
																				<td style="width:100%;padding-right:0px;padding-left:0px;">
																					<div align="center" style="line-height:10px"><a href="www.example.com" target="_blank" style="outline:none" tabindex="-1"><img class="big" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/6761/08bd485f-3aa2-4f51-b1d7-338ed3debb55.png" style="display: block; height: auto; border: 0; width: 679px; max-width: 100%;" width="679" alt="clouds" title="clouds"></a></div>
																				</td>
																			</tr>
																		</table>
																		<table class="heading_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<tr>
																				<td style="padding-bottom:10px;text-align:center;width:100%;">
																					<h1 style="margin: 0; color: #e3f2ff; direction: ltr; font-family: 'Abril Fatface', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 55px; font-weight: 400; letter-spacing: 1px; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Hurray!</span></h1>
																				</td>
																			</tr>
																		</table>
																		<table class="heading_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<tr>
																				<td style="padding-bottom:10px;text-align:center;width:100%;">
																					<h1 style="margin: 0; color: #e3f2ff; direction: ltr; font-family: 'Abril Fatface', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 45px; font-weight: 400; letter-spacing: 1px; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">You have been Approved.</span></h1>
																				</td>
																			</tr>
																		</table>
																		<table class="paragraph_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																			<tr>
																				<td style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
																					<div style="color:#e3f2ff;direction:ltr;font-family:'Droid Serif', Georgia, Times, 'Times New Roman', serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:24px;">
																						<p style="margin: 0;">Thansk for Becoming a member. It's no secret our planet is hurting due to human activity. Earth Day was created to help individuals and business do their part to help protect and preserve it. To help you find some ways you can help save our planet, we put together a list of things you can easily do on Earth Day (and every day after) to reduce your carbon footprint.</p>
																					</div>
																				</td>
																			</tr>
																		</table>
																		<table class="image_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<tr>
																				<td style="width:100%;padding-right:0px;padding-left:0px;padding-top:30px;">
																					<div align="center" style="line-height:10px"><a href="www.example.com" target="_blank" style="outline:none" tabindex="-1"><img class="big" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/6761/4fc76e21-aecd-4b3a-806c-671e16757f2e.png" style="display: block; height: auto; border: 0; width: 680px; max-width: 100%;" width="680" alt="earth with clouds" title="earth with clouds"></a></div>
																				</td>
																			</tr>
																		</table>
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
										<table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
											<tbody>
												<tr>
													<td>
														<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680">
															<tbody>
																<tr>
																	<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
																		<table class="empty_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<tr>
																				<td>
																					<div></div>
																				</td>
																			</tr>
																		</table>
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
										<table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
											<tbody>
												<tr>
													<td>
														<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680">
															<tbody>
																<tr>
																	<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
																		<table class="icons_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<tr>
																				<td style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
																					<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																						<tr>
																							<td style="vertical-align: middle; text-align: center;">
																								<!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
																								<!--[if !vml]><!-->
																							</td>
																						</tr>
																					</table>
																				</td>
																			</tr>
																		</table>
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table><!-- End -->
					</body>
					
					</html>`,
					'',
					res
				)
				return res.status(SC.OK).json({
					message: 'Coporate User has been Approved Successfully',
					data: user
				})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.INTERNAL_SERVER_ERROR).json({
					error: 'Coporate User Approval failed!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Approve Corporate User API called!`)
	}
}

export const updateUserPoints = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const userId = +(req.params.userId || '0')
		const points =
			typeof req.body.points === 'string'
				? +req.body.points
				: req.body.points || 0
		await prisma.user
			.findUnique({
				where: {
					id: userId
				}
			})
			.then(async user => {
				await prisma.user
					.update({
						where: {
							id: user?.id
						},
						data: {
							points: (user?.points || 0) + points,
							totalPoints: (user?.totalPoints || 0) + points
						}
					})
					.then(data => {
						return res.status(SC.OK).json({
							message: 'User points updated successfully!',
							data
						})
					})
					.catch(err => {
						logger(err, 'ERROR')
						return res.status(SC.BAD_REQUEST).json({
							error: 'Failed to update user points!'
						})
					})
			})
			.catch(err => {
				logger(err, 'ERROR')
				return res.status(SC.NOT_FOUND).json({
					error: 'No user found!'
				})
			})
	} catch (err: any) {
		logger(err, 'ERROR')
	} finally {
		logger(`Approve Corporate User API called!`)
	}
}

export const forgotPassword = async (_: any, res: Response): Promise<any> => {
	mailer(
		'shuklamanasofficial@gmail.com',
		'Congratulations You have been Approved!',
		'You Have Been Approvedr',
		`<div style="margin : 10px 0px">Hello User,</div><div style="font-weight: bold , font-size:20px">You have been Approved by the Admin successfully.</div>`,
		'',
		res
	)
		.then(() => logger('Hello WOrld'))
		.catch(() => logger('New Error'))
}
