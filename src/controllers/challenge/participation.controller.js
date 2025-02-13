import { StatusCodes } from 'http-status-codes';
import participationService from '../../services/challenge/participation.service.js';

const joinChallenge = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const challenge_id = parseInt(req.params.challengeId, 10);
    const join_challenge = await participationService.joinChallenge(user_id, challenge_id);
    return res.success(join_challenge, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
};
const likeChallenge = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const challenge_id = parseInt(req.params.challengeId, 10);
    const like_challenge = await participationService.increaseChallengeLike(user_id, challenge_id);
    return res.success(like_challenge, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
};

const unlikeChallenge = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const challenge_id = parseInt(req.params.challengeId, 10);
    const unlike_challenge = await participationService.decreaseChallengeLike(user_id, challenge_id);
    return res.success(unlike_challenge, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const getUserChallengeVerification = async (req, res, next) => {
  try {
    const challenge_id = req.params.challengeId;
    const user_id = req.user.id;
    const response = await participationService.getUserChallengeVerificationbyId(user_id, Number(challenge_id));

    return res.success(response, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const getChallengerList = async (req, res, next) => {
  try {
    const challenge_id = parseInt(req.params.challengeId, 10);
    const challenger_list = await participationService.getChallengerList(challenge_id);
    return res.success(challenger_list, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};
const kickChallenger = () => {};
const getChallengeCalendar = () => {};

export default {
  getUserChallengeVerification,
  joinChallenge,
  likeChallenge,
  unlikeChallenge,
  getChallengerList,
  kickChallenger,
  getChallengeCalendar,
};
