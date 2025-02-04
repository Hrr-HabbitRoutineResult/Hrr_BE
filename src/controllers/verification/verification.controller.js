import { StatusCodes } from 'http-status-codes';
import verificationService from '../../services/verification/verification.service.js';
import verificationDto from '../../dtos/verification/verification.dto.js';

const getChallengeVerificationStatus = async (req, res, next) => {
  try {
    const challenge_id = parseInt(req.params.challengeId, 10);
    const verification_status = await verificationService.getChallengeVerifications(challenge_id);

    // return res.success(verification_status, StatusCodes.OK);
    return res.status(StatusCodes.OK).json(verification_status);
  } catch (error) {
    next(error);
  }
};
const getWeeklyVerification = () => {};
const getSpecificVerification = async (req, res, next) => {
  try {
    const verification_id = parseInt(req.params.verificationId, 10);
    const verification = await verificationService.getSpecificVerification(verification_id);
    return res.status(StatusCodes.OK).json(verification);
  } catch (error) {
    next(error);
  }
};
const cameraVerification = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const challenge_id = parseInt(req.params.challengeId, 10);
    const completed_challenge = await verificationService.verifyWithCamera(user_id, challenge_id, req.body);

    return res.status(StatusCodes.OK).json(completed_challenge);
  } catch (error) {
    next(error);
  }
};

const textVerification = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const challenge_id = parseInt(req.params.challengeId, 10);
    const completed_challenge = await verificationService.verifyWithText(user_id, challenge_id, req.body);

    return res.status(StatusCodes.OK).json(completed_challenge);
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
