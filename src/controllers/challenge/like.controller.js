import { StatusCodes } from 'http-status-codes';
import likeService from '../../services/challenge/like.service.js';

const likeSpecificChallenge = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const challenge_id = Number(req.params.challengeId);
    const like_challenge = await likeService.likeChallenge(user_id, challenge_id);
    return res.success(like_challenge, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
};
const unlikeSpecificChallenge = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const challenge_id = Number(req.params.challengeId);
    const unlike_challenge = await likeService.unlikeChallenge(user_id, challenge_id);
    return res.success(unlike_challenge, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export default {
  likeSpecificChallenge,
  unlikeSpecificChallenge,
};
