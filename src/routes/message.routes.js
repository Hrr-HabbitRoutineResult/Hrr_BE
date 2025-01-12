import express from 'express';
import messageController from '../controllers/message.controller.js';

const router = express.Router();

router.post('/send', messageController.sendMessage);
router.get('/inbox', messageController.getMessageInbox);
router.post('/leave', messageController.leaveMessage);

export default router;
