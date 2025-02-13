import categoryService from '../../services/challenge/category.service.js';
import { StatusCodes } from 'http-status-codes';
import logger from '../../logger.js';

const getChallengeCategory = async (req, res, next) => {
  try {
    logger.debug('카테고리를 불러옵니다!');
    const category = await categoryService.getChallengeCategories();
    return res.success({ category: category }, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const getDailyHotChallenge = async (req, res, next) => {
  try {
    logger.debug('인기 챌린지를 불러옵니다!');
    const hot_challenges = await categoryService.getDailyHotChallenge();
    return res.success({ challenges: hot_challenges }, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

export default {
  getChallengeCategory,
  getDailyHotChallenge,
};
