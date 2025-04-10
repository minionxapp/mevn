import express from 'express'


const router = express.Router()


router.get('/test',(req,res)=>{
    res.send("Test api berhasil")
    
})
export default router