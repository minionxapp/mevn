import Question from "../models/Question.js"
import asyncHandler from "../middleware/asyncHandler.js"
import { checkPermission } from "../middleware/checkPermission.js"

export const CreateQuestion = asyncHandler (async(req,res)=>{
    const {title,question,category} = req.body
    //cek apakah judul sudah ada
    const newQuestion = await Question.create({
        title,
        question,
        category,
        userId : req.user._id

    })

    return res.status(200).json({
        message :"berhasil tambah pertanyaan",
        data : newQuestion
    })

})

export const QuestionsAll =asyncHandler (async(req,res)=>{
    const QuestionData = await Question.find()
    return res.status(200).json({
        message :"Data pertanyaan berhasil di tampilkan semua",
        data : QuestionData
    })

})

export const DetailQuestion =asyncHandler (async(req,res)=>{
    const idParam = req.params.id
    const detailQuestion = await Question.findById(idParam)
    if(!detailQuestion){
        return res.status(404).json({
            message :"Id pertanyaan tidak ditemukan"
        })
    }
    return res.status(200).json({
        message:"Document Id pertanyaan berhasil di temukan",
        data: detailQuestion
    })
})

export const UpdateQuestion =asyncHandler (async(req,res)=>{
    const {title,question,category} = req.body
    const paramId = req.params.id
    // console.log("*****Zzzzzz**** req.user "+req.user+"====paramId :" +paramId)
    // console.log("idQuestion : "+paramId)
    const idQuestion = await Question.findById(paramId)
    
    checkPermission(req.user, idQuestion.userId)

    idQuestion.title = title
    idQuestion.category=category
    idQuestion.question=question
    await idQuestion.save()


    return res.status(200).json({
        message:"Berhasil update pertanyaan",
        data:idQuestion
    })
})

export const DeleteQuestion =asyncHandler (async(req,res)=>{
    res.send("Hapus Pertanyaan")

})