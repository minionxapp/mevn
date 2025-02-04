import DevTabel from "../../models/dev/DevTabel.js";
import asynchHandler from "../../middleware/asyncHandler.js";


export const createDevTable = asynchHandler(async(req,res)=>{
    const { name, desc, priv,owner } = req.body

    const newDevTabel = DevTabel.create({
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
})