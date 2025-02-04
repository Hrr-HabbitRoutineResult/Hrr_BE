import { StatusCodes } from 'http-status-codes';
import likeService from '../../services/verification/like.service.js';

const likeSpecificVerification = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const verification_id = Number(req.params.verificationId);
    const like_verification = await likeService.likeVerification(user_id, verification_id);
    return res.success(like_verification, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};
const unlikeSpecificVerification = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const verification_id = Number(req.params.verificationId);
    const unlike_verification = await likeService.unlikeVerification(user_id, verification_id);
    return res.success(unlike_verification, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export default {
  likeSpecificVerification,
  unlikeSpecificVerification,
};
