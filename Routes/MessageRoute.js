import express from 'express';
import { createMessage, deleteMessage, getMessage } from '../Controllers/MessageController.js';

const router = express.Router();

router.post('/', createMessage)
router.get('/:conversationId/get', getMessage)
router.delete('/:messageId/delete', deleteMessage);

export default router