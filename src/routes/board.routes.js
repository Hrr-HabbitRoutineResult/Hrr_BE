import express from 'express';
import boardController from '../controllers/board.controller.js';

const router = express.Router();

router.get('/categories', boardController.getBoardCategories);
router.post('/', boardController.createBoard);
router.patch('/:boardId/pin', boardController.updateBoardPinned);
router.get('/:boardId/hotness', boardController.getBoardHotPosts);

export default router;
