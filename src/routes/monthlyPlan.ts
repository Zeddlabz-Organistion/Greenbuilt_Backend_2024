import express from 'express'
/**
 * Monthly consumption plan
 */
import {
	createMonthlyConsumptionPlan,
	updateMonthlyConsumptionPlan,
	approveMonthlyConsumptionPlan,
	deleteMonthlyConsumptionById,
	deleteByMonthlyConsumptionPlanId,
	getMonthlyConsumptionById,
	getAllByMonthlyConsumptionId,
	getAllMonthlyConsumptionByUserId,
	getAllMonthlyConsumption
} from '../controllers/monthlyPlan'

import { isCorporate, isAdmin, isSameUserOrAdmin } from './../middlewares/index'

const monthlyPlanRoute = express.Router()

/**
 * Monthly consumption plan goes here
 */

monthlyPlanRoute.post(
	'/monthly-plan/consumption/create',
	isCorporate,
	createMonthlyConsumptionPlan
)
monthlyPlanRoute.post(
	'/monthly-plan/consumption/approve/:monthlyPlanId',
	isAdmin,
	approveMonthlyConsumptionPlan
)
monthlyPlanRoute.put(
	'/monthly-plan/consumption/update',
	updateMonthlyConsumptionPlan
)
monthlyPlanRoute.delete(
	'/monthly-plan/consumption/delete/id/:monthlyPlanId',
	isAdmin,
	deleteMonthlyConsumptionById
)
monthlyPlanRoute.delete(
	'/monthly-plan/consumption/delete/plan-id/:monthlyPlanId',
	isAdmin,
	deleteByMonthlyConsumptionPlanId
)
monthlyPlanRoute.get(
	'/monthly-plan/consumption/get/:monthlyPlanId',
	isCorporate,
	getMonthlyConsumptionById
)
monthlyPlanRoute.get(
	'/monthly-plan/consumption/get-all/plan-id/:monthlyPlanId',
	isCorporate,
	getAllByMonthlyConsumptionId
)
monthlyPlanRoute.get(
	'/monthly-plan/consumption/get-all/user-id/:userId',
	isSameUserOrAdmin,
	getAllMonthlyConsumptionByUserId
)

monthlyPlanRoute.get(
	'/monthly-plan/consumption/get-all',
	isAdmin,
	getAllMonthlyConsumption
)

export { monthlyPlanRoute }
