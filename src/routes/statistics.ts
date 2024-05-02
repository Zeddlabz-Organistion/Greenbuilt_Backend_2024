import express from 'express'
import { getAllAdminStatistics, getAllCorporateStatistics } from '../controllers/statistics'
import { isAdmin, isCorporate } from './../middlewares/index'

const statisticsRoute = express.Router()

statisticsRoute.get(
	'/statistics/corporate/get-all',
	isCorporate,
	getAllCorporateStatistics
)
statisticsRoute.get('/statistics/admin/get-all', isAdmin, getAllAdminStatistics)

export { statisticsRoute }
