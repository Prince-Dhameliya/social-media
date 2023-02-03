import express from 'express';
import { createConversation, deleteConversation, getConversation } from '../Controllers/ConversationController.js';

const router = express.Router();

router.post('/', createConversation)
router.get('/:userId', getConversation)
router.delete('/:conversationId/delete', deleteConversation)

export default router