import { StatusCodes } from 'http-status-codes';
import listDto from '../../dtos/challenge/list.dto.js';
import listService from '../../services/challenge/list.service.js';
import logger from '../../logger.js';
const getChallengeList = async (req, res, next) => {
  try {
    logger.debug('챌린지 리스트를 보여드립니다!');
    logger.debug('Request Query:', req.query); // 디버깅 로그 추가
    //쿼리 파라미터 추출하기
    const { type, category, duration, max_participants, frequency_type, day, name, sort } = req.query;
    const challenge_list = await listService.getChallengeList({
      type: type || null,
      category: category || null,
      duration: duration || null,
      max_participants: max_participants || null,
      frequency_type: frequency_type || null,
      day: day || null,
      name: name || null,
      sort: sort || 'popular', // 기본값 설정
    });
    return res.success({ result: challenge_list }, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};
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

    const { data, keywords } = listDto.bodyToChallenge(req.body);
    const challenge = await listService.createChallenge(data, keywords);
    return res.success({ result: challenge }, StatusCodes.CREATED);
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
