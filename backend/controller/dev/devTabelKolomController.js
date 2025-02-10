import asynchHandler from "../../middleware/asyncHandler.js";
import DevTabelKolom from "../../models/dev/DevTabelKolom.js";


export const createDevTabelKolom= asynchHandler(async(req,res)=>{
    const { tabel, kol_name, kol_tipe,kol_unique,kol_default } = req.body
    const newDevTabel = await DevTabelKolom.create({
        tabel,
        kol_name,
        kol_tipe,
        kol_unique,
        kol_default
    })
    return res.status(200).json({
        message: "berhasil tambah tabel",
        data: newDevTabel
    })

})