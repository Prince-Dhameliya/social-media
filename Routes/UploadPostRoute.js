import express from 'express'
import cloudinary from '../utils/Cloudinary.js'

const router = express.Router();

router.post('/', async (req, res) => {
    const {image} = req.body;

    try {
        if(image){
            const uploadRes = await cloudinary.uploader.upload(image)
            console.log(uploadRes);
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router