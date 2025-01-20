import express from 'express'
import { CreateModel,CreateTable } from '../controller/dev/createModelController.js'
const router = express.Router()

router.get('/test',CreateModel)
router.get('/createmodel',CreateTable)

export default router