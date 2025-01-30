import express from 'express';
import veriificationController from '../controllers/verification/verification.controller.js';
import likeController from '../controllers/verification/like.controller.js';
import commentController from '../controllers/verification/comment.controller.js';
import scrapController from '../controllers/verification/scrap.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// Verification
router.get('/:challengeId/verification-status', veriificationController.getChallengeVerificationStatus);
router.get('/:challengeId/verification/weekly', veriificationController.getWeeklyVerification);
router.get('/:challengeId/verifications/:verificationId', veriificationController.getSpecificVerification);
router.post('/:challengeId/verification/camera', authMiddleware, veriificationController.cameraVerification);
router.post('/:challengeId/verification/text', veriificationController.textVerification);
router.get(
  '/:challengeId/verification/text/:temporaryVerificationId',
  veriificationController.getTemporaryVerification,
);
router.delete(
  '/:challengeId/verification/text/:temporaryVerificationId',
  veriificationController.deleteTemporaryVerification,
);

// Like
router.post('/:verificationId/like', authMiddleware, likeController.likeSpecificVerification);
router.delete('/:verificationId/unlike', authMiddleware, likeController.unlikeSpecificVerification);

// Comment
router.get('/:challengeId/verification/:verificationId/comment', commentController.getVerificationComments);
router.post('/:challengeId/verification/:verificationId/comment', commentController.postVerificationComment);
router.patch('/:challengeId/verification/:verificationId/comment', commentController.updateVerificationComment);

// Scrap
router.post('/:challengeId/verification/:verificationId/scrap', scrapController.scrapVerification);
router.delete('/:challengeId/verification/:verificationId/scrap', scrapController.unscrapVerification);

export default router;
