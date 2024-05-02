import express from 'express'
import { getPlugInData } from '../controllers/plugin'

const plugInRoute = express.Router()

plugInRoute.get('/plugin/get/:userId', getPlugInData)


export { plugInRoute }
