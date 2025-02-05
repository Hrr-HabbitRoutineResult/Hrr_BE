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
router.get('/:verificationId', authMiddleware, veriificationController.getSpecificVerification);
router.post('/:challengeId/verification/camera', authMiddleware, veriificationController.cameraVerification);
router.post('/:challengeId/verification/text', authMiddleware, veriificationController.textVerification);
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
router.get('/:verificationId/comment', authMiddleware, commentController.getVerificationComments);
router.post('/:verificationId/comment', authMiddleware, commentController.postVerificationComment);
router.patch('/comment/:commentId', authMiddleware, commentController.updateVerificationComment);

// Scrap
router.post('/:verificationId/scrap', authMiddleware, scrapController.scrapVerification);
router.delete('/:verificationId/unscrap', authMiddleware, scrapController.unscrapVerification);

export default router;
