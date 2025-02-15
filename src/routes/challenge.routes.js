import express from 'express';
import categoryController from '../controllers/challenge/category.controller.js';
import listController from '../controllers/challenge/list.controller.js';
import participationController from '../controllers/challenge/participation.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import likeController from '../controllers/challenge/like.controller.js';
import scrapController from '../controllers/challenge/scrap.controller.js';
const router = express.Router();

// Category
router.get('/category', authMiddleware, categoryController.getChallengeCategory);
router.get('/hotness', authMiddleware, categoryController.getDailyHotChallenge);

// List and Detail
router.get('/', authMiddleware, listController.getChallengeList);
router.get('/search', authMiddleware, listController.searchChallenge);
router.get('/:challengeId', authMiddleware, listController.getChallengeDetail);
router.post('/', authMiddleware, listController.createChallenge);

// Participation
router.get('/:challengeId/verification/my', authMiddleware, participationController.getUserChallengeVerification);
router.post('/:challengeId/join', authMiddleware, participationController.joinChallenge);
router.post('/:challengeId/like', authMiddleware, participationController.likeChallenge);
router.delete('/:challengeId/unlike', authMiddleware, participationController.unlikeChallenge);
router.get('/:challengeId/challengerslist', participationController.getChallengerList);
router.get('/:challengeId/challengerslist/kick', participationController.kickChallenger);
router.get('/:challengeId/calendar', participationController.getChallengeCalendar);

// Like
router.post('/:challengeId/like', authMiddleware, likeController.likeSpecificChallenge);
router.delete('/:challengeId/unlike', authMiddleware, likeController.unlikeSpecificChallenge);

// Scrap
router.post('/:challengeId/scrap', authMiddleware, scrapController.scrapChallenge);
router.delete('/:challengeId/unscrap', authMiddleware, scrapController.unscrapChallenge);

export default router;
