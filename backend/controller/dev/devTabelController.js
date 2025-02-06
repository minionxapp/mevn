import DevTabel from "../../models/dev/DevTabel.js";
import asynchHandler from "../../middleware/asyncHandler.js";


export const createDevTable = asynchHandler(async(req,res)=>{
    const { name, desc, priv } = req.body

    const oldTable = await DevTabel.findOne({      
        name: name
    }) 

    if(!oldTable){

        const newDevTabel = await DevTabel.create({
            name, 
            desc, 
            priv,
            owner: req.user.name,
            userId: req.user._id
        })
        return res.status(200).json({
            message: "berhasil tambah tabel",
            data: newDevTabel
        })
    }else{
        return res.status(401).json({
            message: "Tabel sudah ada",
            
        })
    }
})