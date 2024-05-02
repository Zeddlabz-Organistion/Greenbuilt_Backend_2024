import { forgotPassword } from './../controllers/auth'
import express from 'express'
import { check } from 'express-validator'
import {
	signin,
	signup,
	signout,
	update,
	updateUserPoints,
	approveCorporateUser
} from '../controllers/auth'
import { isSignedIn, isValidToken, isAdmin } from './../middlewares/index'

const authRoute = express.Router()

authRoute.post(
	'/signup',
	[
		check('name')
			.isLength({
				min: 3
			})
			.withMessage('Please provide a name'),
		check('email').isEmail().withMessage('Please provide a valid E-Mail!'),
		check('password')
			.isLength({ min: 6 })
			.withMessage('Password length should be minimum of 8 characters')
	],
	signup
)
authRoute.post(
	'/signin',
	[
		check('email').isEmail().withMessage('Please provide a valid E-Mail!'),
		check('password')
			.isLength({ min: 6 })
			.withMessage('Password length should be minimum of 8 characters')
	],
	signin
)
authRoute.get('/signout', signout)
authRoute.put('/update/:userId', update)
authRoute.post('/forgot-password', forgotPassword)
authRoute.put(
	'/user/update-points/:userId',
	isSignedIn,
	isValidToken,
	isAdmin,
	updateUserPoints
)
authRoute.post(
	'/user/approve/:userId',
	isSignedIn,
	isValidToken,
	isAdmin,
	approveCorporateUser
)

export { authRoute }
