import express from 'express'
import {
	uploadDocument,
	updateDocument,
	deleteDocument,
	getDocumentById,
	getAllDocumentsByUser
} from '../controllers/document'

const documentRoute = express.Router()

documentRoute.post('/document/upload/:userId', uploadDocument)
documentRoute.put('/document/update/:docId', updateDocument)
documentRoute.delete('/document/delete/:docId', deleteDocument)
documentRoute.get('/document/get/:docId', getDocumentById)
documentRoute.get('/document/get-all/:userId', getAllDocumentsByUser)

export { documentRoute }
