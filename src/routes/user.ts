import express from 'express'
import { getUserById, getAllUsers } from '../controllers/user'
import { isAdmin } from './../middlewares/index'

const userRoute = express.Router()

userRoute.get('/user/get/:userId', getUserById)
userRoute.get('/user/get-all' ,isAdmin, getAllUsers)

export { userRoute }
