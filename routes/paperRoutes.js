const express=require('express')

const router=express.Router()

const upload=require('../middleware/multer')

const controllerPaper=require('../controllers/paperController')

router.post("/post", upload.fields([{ name: "document", maxCount: 1 }, { name: "image", maxCount: 1 }]),controllerPaper.uploadPaper);
router.post("/fetch",controllerPaper.getPaperBySubject)
module.exports=router