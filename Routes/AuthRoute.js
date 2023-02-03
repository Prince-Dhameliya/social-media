const express = require("express");
const { loginUser, registerUser } = require("../Controllers/AuthController.js");

// import express from "express";
// import { loginUser, registerUser } from "../Controllers/AuthController.js";

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router;