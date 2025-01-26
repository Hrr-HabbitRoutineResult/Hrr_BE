import express from 'express';
import categoryController from '../controllers/challenge/category.controller.js';
import listController from '../controllers/challenge/list.controller.js';
import participationController from '../controllers/challenge/participation.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// Category
router.get('/category', categoryController.getChallengeCategory);
router.get('/hotness', categoryController.getWeeklyHotChallenge);

// List and Detail
router.get('/', listController.getChallengeList);
router.get('/search', listController.searchChallenge);
router.get('/:challengeId', authMiddleware, listController.getChallengeDetail);
router.post('/', listController.createChallenge);

// Participation
router.post('/:challengeId/join', authMiddleware, participationController.joinChallenge);
router.post('/:challengeId/like', authMiddleware, participationController.likeChallenge);
router.post('/:challengeId/participation', participationController.participateInChallenge);
router.get('/:challengeId/challengerslist', participationController.getChallengeParticipantsList);
router.get('/:challengeId/challengerslist/kick', participationController.kickChallengeParticipant);
router.get('/:challengeId/calendar', participationController.getChallengeCalendar);

export default router;
