import express from 'express'
import {
	generateQRCode,
	generateMultipleQRCodes,
	consumeQRCode,
	getGeneratedQRs,
	getConsumedQRs,
	getAllConsumedQRs,
	getAllGeneratedQRs,
	getAllQRsByQuery,
	getQRBySearchTerm
} from '../controllers/qrCode'
import { isCorporate, isAdmin } from './../middlewares/index'

const qrRoute = express.Router()

qrRoute.get('/qr/history/generate/get-all', isAdmin, getAllGeneratedQRs)
qrRoute.get('/qr/history/consume/get-all', isAdmin, getAllConsumedQRs)
qrRoute.post('/qr/generate/:productId', isCorporate, generateQRCode)
qrRoute.post(
	'/qr/generate-multiple/:productId',
	isCorporate,
	generateMultipleQRCodes
)
qrRoute.post('/qr/get-all/query', isCorporate, getAllQRsByQuery)
qrRoute.post('/qr/search', isCorporate, getQRBySearchTerm)
qrRoute.post('/qr/consume/:qrId', consumeQRCode)
qrRoute.get('/qr/history/generate/:userId', isCorporate, getGeneratedQRs)
qrRoute.get('/qr/history/consume/:userId', getConsumedQRs)

export { qrRoute }
