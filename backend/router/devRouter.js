import express from 'express'
import { CreateModel,CreateTable } from '../controller/dev/createModelController.js'
import { createDevTable } from '../controller/dev/devTabelController.js'
import  {authMiddleware} from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/test',CreateModel)
router.get('/createmodel',CreateTable)
router.post('/tabel',authMiddleware,createDevTable)

export default router