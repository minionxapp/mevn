import User from "../models/User.js"
import jwt from 'jsonwebtoken'
import asynchHandler from "../middleware/asyncHandler.js"


const signToken = id=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '6d'
    })
}

const cretaeSendToken =(user,statusCode,res) =>{
    const token = signToken(user.id)
    const cookieOption ={
        expire :new Date(Date.now() + 6*24*60*60*1000 ),
        httpOnly : true,
        security : false
    }

    res.cookie('jwt',token,cookieOption)
    user.password=undefined
    res.status(statusCode).json({
        data :user
    })

}

export const RegisterUser =asynchHandler (async (req, res) => {
    // console.log("disini........................................"+JSON.stringify(req.body))
    // try { //pake asyncHanlder try catch di hapus
        const createUser = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
        })
        // return res.status(200).json({
        //     message:"Register Berhasil",
        //     data :createUser
        // })//ganti
        cretaeSendToken(createUser,201,res)
    // } catch (error) {
    //     console.log(error)
    //     return res.status(400).json({
    //         message :"Error",
    //         error
    //     })        
    // }
})

export const LoginUser = asynchHandler(async (req, res) => {
    //validasi email dan password kosong
    if(!req.body.email && !req.body.password){
        res.status(400)
        throw new Error("Input email dan password tidak boleh kosong")
    }

    //cek email terdaftar atau tidak
    const userData = await User.findOne({
        email : req.body.email
    })

    if(userData && (await userData.comparePassword(req.body.password))){
        // res.send("email terdaftar")
        cretaeSendToken(userData,200,res)
    }else{
        res.status(400)
        throw new Error("Invalid User")
    }

})

export const LogoutUser = (req, res) => {
    // res.send('Logout Berhasl')
    res.cookie('jwt','',{
        expire :new Date(0),
        httpOnly : true,
        security : false
    })
    res.status(200).json({
        message:'logout Berhasil'
    })
}

export const getUser = async (req, res) => {   
    const user = await User.findById(req.user.id).select({passwor : 0})
    if(user){
        return res.status(200).json({
            user : user
        })
    }

    return res.status(401).json({
        message : 'user tidak ditemukan'
    })
}