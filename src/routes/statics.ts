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

const staticRoutes = express.Router()
/**
 * industry type goes here
 */
staticRoutes.post('/industryType/create', createIndustryType)
staticRoutes.put('/industryType/update/:industryTypeId', updateIndustryType)
staticRoutes.delete('/industryType/delete/:industryTypeId', deleteIndustryType)
staticRoutes.get('/industryType/get/:industryTypeId', getIndustryType)
staticRoutes.get('/industryType/get-all', getAllIndustryTypes)

/**
 * source type goes here
 */
staticRoutes.post('/sourceType/create', createSourceType)
staticRoutes.put('/sourceType/update/:sourceTypeId', updateSourceType)
staticRoutes.delete('/sourceType/delete/:sourceTypeId', deleteSourceType)
staticRoutes.get('/sourceType/get/:sourceTypeId', getSourceType)
staticRoutes.get('/sourceType/get-all', getAllSourceTypes)

/**
 * uom goes here
 */
staticRoutes.post('/uom/create', createUOM)
staticRoutes.put('/uom/update/:uomId', updateUOM)
staticRoutes.delete('/uom/delete/:uomId', deleteUOM)
staticRoutes.get('/uom/get/:uomId', getUOM)
staticRoutes.get('/uom/get-all', getAllUOMs)

/**
 * packaging type goes here
 */
staticRoutes.post('/packagingType/create', createPackagingType)
staticRoutes.put('/packagingType/update/:packagingTypeId', updatePackagingType)
staticRoutes.delete(
	'/packagingType/delete/:packagingTypeId',
	deletePackagingType
)
staticRoutes.get('/packagingType/get/:packagingTypeId', getPackagingType)
staticRoutes.get('/packagingType/get-all', getAllPackagingTypes)

export { staticRoutes }
