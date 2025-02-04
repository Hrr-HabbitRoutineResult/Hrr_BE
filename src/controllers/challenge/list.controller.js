import { StatusCodes } from 'http-status-codes';
import listDto from '../../dtos/challenge/list.dto.js';
import listService from '../../services/challenge/list.service.js';
import logger from '../../logger.js';
const getChallengeList = () => {};
const searchChallenge = () => {};
const getChallengeDetail = async (req, res, next) => {
  try {
    const challenge_id = parseInt(req.params.challengeId, 10);
    const challenge_info = await listService.getChallengeDetailById(challenge_id);

    return res.success(challenge_info, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const createChallenge = async (req, res, next) => {
  try {
    logger.debug('챌린지를 개설했습니다!');

    const challenge = await listService.createChallenge(listDto.bodyToChallenge(req.body));
    return res.success({ result: challenge }, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export default {
  getChallengeList,
  searchChallenge,
  getChallengeDetail,
  createChallenge,
};
