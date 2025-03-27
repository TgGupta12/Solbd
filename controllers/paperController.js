const cloudinary=require('../config/cloudinary')
const fs=require('fs')
const Paper=require('../models/paperSchema')

exports.uploadPaper=async(req,res)=>{
    try{
        const {subject,sem,year,exam}=req.body;
        if(!subject || !sem || !year || !exam){
            return res.status(400).json({
                message:"incomplete details"
            })
        }
        if(!req.files){
            return res.status(400).json({
                message:"Invalid attachments"
            })
        }

        const filePath1=req.files.document[0].path;
        const filePath2=req.files.image[0].path;

        const ppr=await cloudinary.uploader.upload(filePath2,{resource_type:"image"});
        const solu=await cloudinary.uploader.upload(filePath1,{resource_type:"auto"});

        const new_data=new Paper({
            subject:subject,
            year:year,
            exam:exam,
            sem:sem,
            queUrl:ppr.secure_url,
            solUrl:solu.secure_url
        })

        await new_data.save();

        fs.unlinkSync(filePath1)

        fs.unlinkSync(filePath2)

        return res.status(200).json({
            message:"success",
            data:new_data
        })

    }catch(err){
        return res.json({
            message:"problem in uploading paper",
            error:err
        })
    }
}

exports.getPaperBySubject=async(req,res)=>{
    try{
        const {sub}=req.body;
        if(!sub){
            return res.json({
                message:"please provide subject"
            })
        }

        const data=await Paper.find({subject:sub});

        return res.status(200).json({
            message:"success",
            papers:data
        })

    }catch(err){
        return res.json({
            message:"problem in fetching papers",
            error:err
        })

    }
}