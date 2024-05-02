import { Application } from 'express'
import { isSignedIn, isValidToken } from './../middlewares/index'
import { authRoute } from './auth'
import { staticRoutes } from './statics'
import { userRoute } from './user'
import { qrRoute } from './qrCode'
import { productRoute } from './product'
import { documentRoute } from './document'
import { assetRoute } from './asset'
import { statisticsRoute } from './statistics'
import { powerConsumptionRoute } from './powerConsumption'
import { monthlyPlanRoute } from './monthlyPlan'
import { notificationRoute } from './notification'
import { plugInRoute } from './plugin'

export const routes = (app: Application) => {
	app.use('/api', authRoute)
	app.use('/api', staticRoutes)
	app.use('/api',plugInRoute)
	app.use('/api', isSignedIn, isValidToken, documentRoute)
	app.use('/api', isSignedIn, isValidToken, userRoute)
	app.use('/api', isSignedIn, isValidToken, statisticsRoute)
	app.use('/api', isSignedIn, isValidToken, qrRoute)
	app.use('/api', isSignedIn, isValidToken, productRoute)
	app.use('/api', isSignedIn, isValidToken, assetRoute)
	app.use('/api', isSignedIn, isValidToken, powerConsumptionRoute)
	app.use('/api', isSignedIn, isValidToken, monthlyPlanRoute)
	app.use('/api', isSignedIn, isValidToken, notificationRoute)

	return app
}
