import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const authMiddleware =async(req,res,next) =>{
    let token;
    token = req.cookies.jwt

    if(!token){
        return next(
            res.status(401).json({
                message :"Anda tidak boleh mengakases halaman ini"
            })
        )
    }

    let decode;
    try {
        decode = await jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return next(
            res.status(401).json({
                message :"Token tidak ada"
            })
        )
    }

    const currenUser = await User.findById(decode.id)
    if(!currenUser){
        return next(
            res.status(401).json({
                message :"ToUser tidak ditemukan"
            })
        )
    }

    req.user= currenUser

    next()

}