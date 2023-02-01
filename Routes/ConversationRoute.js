import express from 'express';
import { createConversation, deleteConversation, getConversation } from '../Controllers/ConversationController.js';

const router = express.Router();

router.post('/conversations', createConversation)
router.get('/conversations/:userId', getConversation)
router.delete('/conversations/:conversationId/delete', deleteConversation)

export default router