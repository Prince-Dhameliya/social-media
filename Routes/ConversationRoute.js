const express = require("express");
const { createConversation, deleteConversation, getConversation } = require('../Controllers/ConversationController.js');

const router = express.Router();

router.post('/', createConversation)
router.get('/:userId', getConversation)
router.delete('/:conversationId/delete', deleteConversation)

module.exports = router