import { isAdmin } from './../middlewares/index'
import express from 'express'
import {
	createAsset,
	bulkUpload,
	updateAsset,
	deleteAsset,
	getAssetById,
	getAllAssets,
	getAllUserAssets
} from '../controllers/asset'

const assetRoute = express.Router()

assetRoute.post('/asset/upload/:userId', isAdmin, createAsset)
assetRoute.post('/asset/bulk-upload/:userId', isAdmin, bulkUpload)
assetRoute.put('/asset/update/:assetId', isAdmin, updateAsset)
assetRoute.delete('/asset/delete/:assetId', isAdmin, deleteAsset)
assetRoute.get('/asset/get/:assetId', isAdmin, getAssetById)
assetRoute.get('/asset/get-all', isAdmin, getAllAssets)
assetRoute.get('/asset/get-all/user/:userId', isAdmin, getAllUserAssets)

export { assetRoute }
