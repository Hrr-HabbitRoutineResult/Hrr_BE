import express from 'express';
import usersController from '../controllers/users.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();

router.put('/:userId/interests', usersController.putUserInterests);
router.get('/:userId', usersController.getUserById);
router.put('/me', authMiddleware, usersController.putMe);
router.get('/:userId/challenges/ongoing', usersController.getUserChallengesOngoing);
router.get('/:userId/challenges/completed', usersController.getUserChallengesCompleted);
router.get('/challenges/verification/history', authMiddleware, usersController.getUserChallengesHistory);
router.get('/:userId/badges', usersController.getUserBadges);
router.post('/:followedUserId/follow', authMiddleware, usersController.postUserFollow);
router.delete('/:unfollowedUserId/unfollow', authMiddleware, usersController.deleteUserFollow);
router.get('/verification/scrap', authMiddleware, usersController.getUserVerificationScraps);
router.get('/verification/likes', authMiddleware, usersController.getUserVerificationLikes);
router.get('/badges/conditions', authMiddleware, usersController.getUserBadgesConditions);
router.get('/level', authMiddleware, usersController.getUserLevel);
router.post('/block', usersController.blockUser);
export default router;
