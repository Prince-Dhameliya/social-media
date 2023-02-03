const express = require("express");
const { createMessage, deleteMessage, getMessage } = require('../Controllers/MessageController.js');
// import express from 'express';
// import { createMessage, deleteMessage, getMessage } from '../Controllers/MessageController.js';

const router = express.Router();

router.post('/', createMessage)
router.get('/:conversationId/get', getMessage)
router.delete('/:messageId/delete', deleteMessage);

module.exports = router