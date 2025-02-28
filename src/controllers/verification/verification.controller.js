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
    const challenge_id = req.params.challengeId;
    const user_id = req.user.id; // 토큰에서 유저 ID 추출
    const result = await verificationService.getWeeklyVerification(challenge_id, user_id);
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
    const photo_url = req.body.photoUrl;

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
