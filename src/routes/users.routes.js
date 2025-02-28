import express from 'express';
import usersController from '../controllers/users.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();

router.put('/interests/category', authMiddleware, usersController.putUserInterests);
router.put('/me', authMiddleware, usersController.putMe);
router.get('/:userId/challenges/ongoing', usersController.getUserChallengesOngoing);
router.get('/:userId/challenges/completed', usersController.getUserChallengesCompleted);
router.get('/challenges/verification/history', authMiddleware, usersController.getUserChallengesHistory);
router.get('/:userId/badges', usersController.getUserBadges);
router.get('/badges/lately', authMiddleware, usersController.getUserBadgesLately);
router.post('/:followedUserId/follow', authMiddleware, usersController.postUserFollow);
router.delete('/:unfollowedUserId/unfollow', authMiddleware, usersController.deleteUserFollow);
router.get('/verification/scrap', authMiddleware, usersController.getUserVerificationScraps);
router.get('/verification/likes', authMiddleware, usersController.getUserVerificationLikes);
router.get('/badges/:badgeId/conditions', authMiddleware, usersController.getUserBadgesConditions);
router.get('/level', authMiddleware, usersController.getUserLevel);
router.post('/:userId/block', authMiddleware, usersController.blockUser);
router.delete('/:userId/unblock', authMiddleware, usersController.unblockUser);
router.get('/blocked', authMiddleware, usersController.getBlockedList);
router.get('/:userId/following', usersController.getFollowingList);
router.get('/:userId/follower', usersController.getFollowerList);
router.patch('/quit', authMiddleware, usersController.userQuit);
router.get('/:userId', usersController.getUserById);

export default router;
