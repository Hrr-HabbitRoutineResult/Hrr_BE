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

const getWeeklyHotChallenge = () => {
  return null;
};

export default {
  getChallengeCategory,
  getWeeklyHotChallenge,
};
