import asyncHandler from "../middleware/asyncHandler.js";
import { checkPermission } from "../middleware/checkPermission.js";
import mongoose, { isValidObjectId } from "mongoose";
import { validId, capitalize, lowerCase } from "../middleware/util.js"
import Kelas from "../models/Kelas.js";

export const testKelas = asyncHandler(async (req, res) => {
    res.send('testt Kelas')

})

export const CreateKelas = asyncHandler(async (req, res) => {
    const { nama, keterangan, level, } = req.body;

    const oldNama = await Kelas.findOne({
        nama: nama
    });
    if (!oldNama) {
        const newKelas = await Kelas.create({
            nama,
            keterangan,
            level,
            userId: req.user._id
        })
        return res.status(200).json({
            message: "berhasil tambah data kelas",
        }
        )
    } else {
        return res.status(401).json({
            message: "Data sudah ada",
        })
    }
})
export const GetAllKelas = asyncHandler(async (req, res) => {
    const KelasData = await Kelas.find()
    return res.status(200).json({
        message: "Data Kelas berhasil di tampilkan semua",
        data: KelasData
    })
})

export const GetKelasId = asyncHandler(async (req, res) => {
    console.log("GetKelasId")
    const idParam = req.params.id
    const detailKelas = await Kelas.findById(idParam)
    if (!detailKelas) {
        return res.status(404).json({
            message: "Id Kelas tidak ditemukan"
        })
    }
    return res.status(200).json({
        message: "Document Id kelas berhasil di temukan",
        data: detailKelas
    })
})

export const GetKelasByName = asyncHandler(async (req, res) => {
    console.log("GetKelasByName")
    const kelas = req.params.kelas
    const detailKelas = await Kelas.find
    ({ nama: {$regex:kelas} })
    if (!detailKelas) {
        return res.status(404).json({
            message: "Id Kelas tidak ditemukan"
        })
    }
    return res.status(200).json({
        message: "Document Id kelas berhasil di temukan",
        data: detailKelas
    })
})


export const DeleteKelas = asyncHandler(async (req, res) => {
    //format id harus seuai dengan format ObjectId pad mongoo
    const idParam = req.params.id
    if (!validId(idParam)) {
        return res.status(404).json({
            message: "Format Id salah"
        })
    }
    const detailKelas = await Kelas.findById(idParam)
    if (!detailKelas) {
        return res.status(404).json({
            message: "Id pertanyaan tidak ditemukan"
        })
    }
    //checkPermission(req.user, detailKelas.userId, res)
    const deleteKelas = await Kelas.findByIdAndDelete(idParam)
    return res.status(200).json({
        message: "Delete kelas berhasil"
    })
})

export const UpdateKelas = asyncHandler(async (req, res) => {
    const { nama, keterangan, level, } = req.body;

    const paramId = req.params.id
    const idKelas = await Kelas.findById(paramId)
    if (!idKelas) {
        res.status(404)
        throw new Error("Pertanyaan tidak ditemukan")
    }
    //checkPermission(req.user, idKelas.userId, res)
    idKelas.nama = nama
    idKelas.keterangan = keterangan
    idKelas.level = level
    await idKelas.save()
    return res.status(200).json({
        message: "Berhasil update kelas",
        data: idKelas
    })
})

