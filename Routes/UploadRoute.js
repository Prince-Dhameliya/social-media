const express = require("express");
const multer = require("multer");
// import express from 'express';
// import multer from 'multer'

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});
const upload = multer({ storage: storage });

router.post('/upload', upload.single("file", (req, res) => {
    try {
        return res.status(200).json("File Uploaded Successfully")
    } catch (error) {
        console.log(error);
    }
}))

module.exports = router