import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import categoryController from '../controllers/challenge/category.controller.js';
import listController from '../controllers/challenge/list.controller.js';
import participationController from '../controllers/challenge/participation.controller.js';

const router = express.Router();

// Category
router.get('/category', authMiddleware, categoryController.getChallengeCategory);
router.get('/hotness', categoryController.getWeeklyHotChallenge);

// List and Detail

router.get('/', authMiddleware, listController.getChallengeList);
router.get('/search', authMiddleware, listController.searchChallenge);
router.get('/:challengeId', authMiddleware, listController.getChallengeDetail);
router.post('/', authMiddleware, listController.createChallenge);

// Participation
router.post('/:challengeId/join', authMiddleware, participationController.joinChallenge);
router.post('/:challengeId/like', authMiddleware, participationController.likeChallenge);
router.post('/:challengeId/participation', authMiddleware, participationController.participateInChallenge);
router.get('/:challengeId/challengerslist', authMiddleware, participationController.getChallengeParticipantsList);
router.get('/:challengeId/challengerslist/kick', authMiddleware, participationController.kickChallengeParticipant);
router.get('/:challengeId/calendar', authMiddleware, participationController.getChallengeCalendar);

export default router;
