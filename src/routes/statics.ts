import express from 'express'
import {
	createIndustryType,
	updateIndustryType,
	deleteIndustryType,
	getIndustryType,
	getAllIndustryTypes,
	createSourceType,
	updateSourceType,
	deleteSourceType,
	getSourceType,
	getAllSourceTypes,
	createUOM,
	updateUOM,
	deleteUOM,
	getUOM,
	getAllUOMs,
	createPackagingType,
	updatePackagingType,
	deletePackagingType,
	getPackagingType,
	getAllPackagingTypes
} from '../controllers/statics'
import { isAdmin } from '../middlewares'
const staticRoutes = express.Router()
/**
 * industry type goes here
 */
staticRoutes.post('/industryType/create', isAdmin, createIndustryType)
staticRoutes.put(
	'/industryType/update/:industryTypeId',
	isAdmin,
	updateIndustryType
)
staticRoutes.delete(
	'/industryType/delete/:industryTypeId',
	isAdmin,
	deleteIndustryType
)
staticRoutes.get('/industryType/get/:industryTypeId', getIndustryType)
staticRoutes.get('/industryType/get-all', getAllIndustryTypes)

/**
 * source type goes here
 */
staticRoutes.post('/sourceType/create', isAdmin, createSourceType)
staticRoutes.put('/sourceType/update/:sourceTypeId', isAdmin, updateSourceType)
staticRoutes.delete(
	'/sourceType/delete/:sourceTypeId',
	isAdmin,
	deleteSourceType
)
staticRoutes.get('/sourceType/get/:sourceTypeId', getSourceType)
staticRoutes.get('/sourceType/get-all', getAllSourceTypes)

/**
 * uom goes here
 */
staticRoutes.post('/uom/create', isAdmin, createUOM)
staticRoutes.put('/uom/update/:uomId', isAdmin, updateUOM)
staticRoutes.delete('/uom/delete/:uomId', isAdmin, deleteUOM)
staticRoutes.get('/uom/get/:uomId', getUOM)
staticRoutes.get('/uom/get-all', getAllUOMs)

/**
 * packaging type goes here
 */
staticRoutes.post('/packagingType/create', isAdmin, createPackagingType)
staticRoutes.put(
	'/packagingType/update/:packagingTypeId',
	isAdmin,
	updatePackagingType
)
staticRoutes.delete(
	'/packagingType/delete/:packagingTypeId',
	isAdmin,
	deletePackagingType
)
staticRoutes.get('/packagingType/get/:packagingTypeId', getPackagingType)
staticRoutes.get('/packagingType/get-all', getAllPackagingTypes)

export { staticRoutes }
