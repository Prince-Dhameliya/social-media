import express from 'express';
import { createMessage, deleteMessage, getMessage } from '../Controllers/MessageController.js';

const router = express.Router();

router.post('/messages', createMessage)
router.get('/messages/:conversationId/get', getMessage)
router.delete('/messages/:messageId/delete', deleteMessage);

export default router