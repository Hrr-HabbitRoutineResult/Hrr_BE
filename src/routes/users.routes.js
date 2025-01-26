import express from 'express';
import usersController from '../controllers/users.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();

router.put('/:userId/interests', usersController.putUserInterests);
router.get('/me', authMiddleware, usersController.getMe);
router.put('/me', authMiddleware, usersController.putMe);
router.get('/challenges/ongoing', authMiddleware, usersController.getUserChallengesOngoing);
router.get('/challenges/completed', usersController.getUserChallengesCompleted);
router.get('/challenges/history', usersController.getUserChallengesHistory);
router.get('/badges', usersController.getUserBadges);
router.post('/:userId/follow', usersController.postUserFollow);
router.delete('/:userId/follow', usersController.deleteUserFollow);
router.get('/:userId/scraps', usersController.getUserScraps);
router.post('/block', usersController.blockUser);
export default router;
