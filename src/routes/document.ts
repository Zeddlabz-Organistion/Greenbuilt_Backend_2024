import express from 'express'
import {
	uploadDocument,
	updateDocument,
	deleteDocument,
	getDocumentById,
	getAllDocumentsByUser
} from '../controllers/document'

const documentRoute = express.Router()

documentRoute.post('/document/upload/:userId', uploadDocument)//log user data
documentRoute.put('/document/update/:docId', updateDocument)//log user data
documentRoute.delete('/document/delete/:docId', deleteDocument)//log user data
documentRoute.get('/document/get/:docId', getDocumentById)
documentRoute.get('/document/get-all/:userId', getAllDocumentsByUser)

export { documentRoute }
