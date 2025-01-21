import express from 'express';
import boardController from '../controllers/board.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();

router.get('/categories', authMiddleware, boardController.getBoardCategories);
router.post('/', boardController.createBoard);
router.patch('/:boardId/pin', boardController.updateBoardPinned);
router.get('/:boardId/hotness', boardController.getBoardHotPosts);

export default router;
