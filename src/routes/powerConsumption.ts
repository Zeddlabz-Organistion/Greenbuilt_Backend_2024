import express from 'express'
import {
	createEnergyConsumption,
	updateEnergyConsumption,
	deletePowerConsumption,
	getPowerConsumptionById,
	getAllPowerConsumptionByUser,
	getAllPowerConsumption,
	approvePowerConsumption
} from '../controllers/powerConsumption'
import { isCorporate, isAdmin } from './../middlewares/index'

const powerConsumptionRoute = express.Router()

powerConsumptionRoute.post(
	'/power-consumption/create',
	isCorporate,
	createEnergyConsumption
) // loguser data
powerConsumptionRoute.put(
	'/power-consumption/update/:powerConsumptionId',
	updateEnergyConsumption
) // loguser data

powerConsumptionRoute.delete(
	'/power-consumption/delete/:powerConsumptionId',
	deletePowerConsumption
) // loguser data
powerConsumptionRoute.get(
	'/power-consumption/get/:powerConsumptionId',
	getPowerConsumptionById
)
powerConsumptionRoute.get(
	'/power-consumption/get-all/user/:userId',
	getAllPowerConsumptionByUser
)
powerConsumptionRoute.get('/power-consumption/get-all', getAllPowerConsumption)
powerConsumptionRoute.post(
	'/power-consumption/approve/:powerConsumptionId',
	isAdmin,
	approvePowerConsumption
) // loguser data

export { powerConsumptionRoute }
