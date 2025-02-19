import express from 'express';
import authController from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();

// Login Route
router.post('/login/email', authController.emailLogin);
router.post('/login/kakao', authController.kakaoLogin);
router.post('/login/naver', authController.naverLogin);

router.post('/find-email', authController.findEmail);
router.post('/reset-password/phone', authController.resetPasswordByPhone);
router.post('/password/reset', authController.resetPasswordByEmail);

router.post('/register', authController.register);
router.post('/send-verify-email', authController.sendVerificationCode);
router.post('/check-email-verification-code', authController.checkEmailVerificationCode);
router.post('/check-nickname', authController.checkNickname);
router.patch('/password', authMiddleware, authController.changePassword);
router.post('/password/check', authMiddleware, authController.checkPassword);
// Refresh Token Route
router.post('/token', authController.refreshToken);

export default router;
