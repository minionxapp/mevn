// const express = require('express')
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRouter from './router/authRouter.js'
import cookieParser from 'cookie-parser'
//unutk logger
import morgan from 'morgan'
import { errorHandler,notFound } from './middleware/errorHandler.js'

dotenv.config()
export const app = express()
const port = 3000

//middleware
app.use(cors())
//setup untuk express
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
if(process.env.NODE_Env ==='development'){
  app.use(morgan('dev'))
}

//end poin
app.get('/', (req, res) => {
  res.status(200).json({
    message :"Message dari end pont"
  })
}) 

// parent Router
app.use('/api/v1/auth',authRouter)
app.use(notFound)
app.use(errorHandler)


app.listen(port, () => {
  console.log(`aplikasi jalanxxx di port port ${port}`)
})

// connection db
mongoose.connect(process.env.DATABASE,{

}).then(()=>{
    // console.log("database connect")
})
export default app