import express from 'express'
import {RegisterUser,LoginUser,LogoutUser,getUser} from '../controller/authController.js'
import  {authMiddleware} from '../middleware/authMiddleware.js'
const router = express.Router()
//post /api/v1/auth/register
router.post('/register',RegisterUser)
//post /api/v1/auth/login
router.post('/login',LoginUser)
//get /api/v1/auth/logout
router.get('/logout',LogoutUser)
//get /api/v1/auth/getUser
router.get('/getUser',authMiddleware,getUser)

export default router