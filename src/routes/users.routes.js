import express from 'express';
import usersController from '../controllers/users.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();

router.put('/:userId/interests', usersController.putUserInterests);
router.get('/me', authMiddleware, usersController.getMe);
router.put('/me', authMiddleware, usersController.putMe);
router.get('/challenges/ongoing', authMiddleware, usersController.getUserChallengesOngoing);
router.get('/challenges/completed', authMiddleware, usersController.getUserChallengesCompleted);
router.get('/challenges/verification/history', authMiddleware, usersController.getUserChallengesHistory);
router.get('/badges', authMiddleware, usersController.getUserBadges);
router.post('/:followedUserId/follow', authMiddleware, usersController.postUserFollow);
router.delete('/:unfollowedUserId/unfollow', authMiddleware, usersController.deleteUserFollow);
router.get('/:userId/scraps', usersController.getUserScraps);
router.post('/block', usersController.blockUser);
export default router;
