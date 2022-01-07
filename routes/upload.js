const router = require('express').Router()
const cloudinary = require('cloudinary')
const auth = require('../middleware/authorization')
const authAdmin = require('../middleware/authAdmin')
const fs = require('fs')

//uploading images on cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME ,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})
//upload images (only admin can do this)
router.post('/upload',(req,res)=>{
    try {
        console.log(req.files)
        if(!req.files || Object.keys(req.files).length===0){
            removeTemp(file.tempFilePath)
            return res.status(400).send('No files were uploaded.')
        }
            

        const file = req.files.file;
        if( file.size > 1024*1024 )
            return res.status(400).json({msg:"Size is too Large"})
        if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png"){
            removeTemp(file.tempFilePath)
            return res.status(400).json({msg:"An Incorrect image format"})
        }
           

        cloudinary.v2.uploader.upload(file.tempFilePath,{folder:'test'},async(error,result)=>{
            if(error) throw error;
            removeTemp(file.tempFilePath)
            res.json({public_id:result.public_id,url:result.secure_url})
        })

       

    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
})

//delete images (only admin can do this)
router.post('/trash',(req,res)=>{
    try {
        const {public_id}=req.body;
        if(!public_id)
            return res.status(400).json({msg:'No images are selected.'})

        cloudinary.v2.uploader.destroy(public_id,async(error,result)=>{
            if(error) throw error;

            res.json({msg:"Image is successfully deleted."})
        })
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
})

const removeTemp = (path)=>{
    fs.unlink(path,error=>{
        if(error) throw error;
    })
}

module.exports = router