import { isAdmin } from '../middlewares/index'
import { getAllLogUsersData } from '../controllers/logUsesrData'
import express from 'express'
const logUsersRoute = express.Router()

logUsersRoute.get('/logsdata/get-all', isAdmin, getAllLogUsersData)

export { logUsersRoute }
