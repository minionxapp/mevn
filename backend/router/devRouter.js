import express from 'express'
import { CreateModel,CreateTable } from '../controller/dev/createModelController.js'
import { createDevTable,getAllTabels } from '../controller/dev/devTabelController.js'
import  {authMiddleware} from '../middleware/authMiddleware.js'
import { createDevTabelKolom } from '../controller/dev/devTabelKolomController.js'


const router = express.Router()

router.get('/test',CreateModel)
router.get('/createmodel',CreateTable)
router.post('/tabel',authMiddleware,createDevTable)

router.post('/tabelkolom',createDevTabelKolom)
router.get('/alltables',getAllTabels)

export default router