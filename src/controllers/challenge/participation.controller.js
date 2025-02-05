import { StatusCodes } from 'http-status-codes';
import participationService from '../../services/challenge/participation.service.js';

const joinChallenge = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const challenge_id = parseInt(req.params.challengeId, 10);
    const join_challenge = await participationService.joinChallenge(user_id, challenge_id);
    return res.status(StatusCodes.OK).json(join_challenge);
  } catch (error) {
    next(error);
  }
};
const likeChallenge = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const challenge_id = parseInt(req.params.challengeId, 10);
    const like_challenge = await participationService.increaseChallengeLike(user_id, challenge_id);
    return res.status(StatusCodes.OK).json(like_challenge);
  } catch (error) {
    next(error);
  }
};

const unlikeChallenge = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const challenge_id = parseInt(req.params.challengeId, 10);
    const unlike_challenge = await participationService.decreaseChallengeLike(user_id, challenge_id);
    return res.status(StatusCodes.OK).json(unlike_challenge);
  } catch (error) {
    next(error);
  }
};

const getUserChallengeVerification = async (req, res, next) => {
  try {
    const challenge_id = req.params.challengeId;
    const user_id = req.user.id;
    const response = await participationService.getUserChallengeVerificationbyId(user_id, Number(challenge_id));

    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const getChallengerList = async (req, res, next) => {
  try {
    const challenge_id = parseInt(req.params.challengeId, 10);
    const challenger_list = await participationService.getChallengerList(challenge_id);
    return res.status(StatusCodes.OK).json(challenger_list);
  } catch (error) {
    next(error);
  }
};
const kickChallenger = () => {};
const getChallengeCalendar = () => {};

export default {
  joinChallenge,
  likeChallenge,
  unlikeChallenge,
  getUserChallengeVerification,
  getChallengerList,
  kickChallenger,
  getChallengeCalendar,
};
