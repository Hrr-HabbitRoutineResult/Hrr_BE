import { StatusCodes } from 'http-status-codes';
import verificationService from '../../services/verification/verification.service.js';
import verificationDto from '../../dtos/verification/verification.dto.js';
import { uploadToS3 } from '../../utils/s3Uploader.js';
const getChallengeVerificationStatus = async (req, res, next) => {
  try {
    const challenge_id = parseInt(req.params.challengeId, 10);
    const verification_status = await verificationService.getChallengeVerifications(challenge_id);

    return res.success(verification_status, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};
const getWeeklyVerification = async (req, res, next) => {
  try {
    const { challengeId } = req.params;
    const userId = req.user.id; // 토큰에서 유저 ID 추출
    const result = await verificationService.getWeeklyVerification(challengeId, userId);
    return res.success(result, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};
const getSpecificVerification = async (req, res, next) => {
  try {
    const verification_id = parseInt(req.params.verificationId, 10);
    const verification = await verificationService.getSpecificVerification(verification_id);
    return res.success(verification, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};
const cameraVerification = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const challenge_id = parseInt(req.params.challengeId, 10);
    if (!req.file) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: '파일이 필요합니다.' });
    }

    // S3 업로드
    const photo_url = await uploadToS3(req.file);
    const completed_challenge = await verificationService.verifyWithCamera(user_id, challenge_id, photo_url, req.body);

    return res.success(completed_challenge, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const textVerification = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const challenge_id = parseInt(req.params.challengeId, 10);
    const completed_challenge = await verificationService.verifyWithText(user_id, challenge_id, req.body);

    return res.success(completed_challenge, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};
const getTemporaryVerification = () => {};
const deleteTemporaryVerification = () => {};

export default {
  getChallengeVerificationStatus,
  getWeeklyVerification,
  getSpecificVerification,
  cameraVerification,
  textVerification,
  getTemporaryVerification,
  deleteTemporaryVerification,
};
