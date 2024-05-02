import express from 'express'
import {
	getAllUserNotifications,
	getAllNotifications
} from '../controllers/notification'
import { isSameUserOrAdmin, isAdmin } from './../middlewares/index'

const notificationRoute = express.Router()

notificationRoute.get(
	'/notification/user/:userId',
	isSameUserOrAdmin,
	getAllUserNotifications
)
notificationRoute.get('/notifications', isAdmin, getAllNotifications)

export { notificationRoute }
