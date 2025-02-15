import express from 'express';
import boardController from '../controllers/board.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();

router.get('/categories', authMiddleware, boardController.getBoardCategories);
router.post('/', authMiddleware, boardController.createBoard);
router.patch('/:boardId/pin', authMiddleware, boardController.pinBoard);
router.patch('/:boardId/unpin', authMiddleware, boardController.unpinBoard);
router.get('/:boardId/hotness', boardController.getBoardHotPosts);

export default router;
