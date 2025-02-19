import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import upload from '../middlewares/uploadMiddleware.js';
import utilController from '../controllers/util.controller.js';
const router = express.Router();

router.post('/upload', authMiddleware, upload.single('photo'), utilController.uploadImg);
export default router;
