import express from 'express'
import {
	createProduct,
	bulkUpload,
	getProduct,
	getAllCorporateProducts,
	getAllProducts,
	updateProductPoints,
	approveProduct,
	deleteProduct,
	getAllProductsByQuery,
	getProductsBySearchTerm
} from '../controllers/product'
import { isCorporate, isAdmin } from './../middlewares/index'

const productRoute = express.Router()

productRoute.post('/product/create', isCorporate, createProduct) //log data
productRoute.post('/product/bulk-upload', isCorporate, bulkUpload) //log data
productRoute.get('/product/get/:productId', isCorporate, getProduct)
productRoute.get(
	'/product/get-all/corporate',
	isCorporate,
	getAllCorporateProducts
)
productRoute.post('/product/get-all/query', isCorporate, getAllProductsByQuery)
productRoute.post('/product/search', isCorporate, getProductsBySearchTerm)
productRoute.delete('/product/delete/:productId', isCorporate, deleteProduct) //log data
productRoute.get('/product/get-all/admin', isAdmin, getAllProducts)
productRoute.post('/product/approve/:productId', isAdmin, approveProduct) //log user data
productRoute.put(
	'/product/update-points/:productId',
	isAdmin,
	updateProductPoints
) //log user data

export { productRoute }
