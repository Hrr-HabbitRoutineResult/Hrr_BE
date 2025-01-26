import categoryRepository from '../../repositories/challenge/category.repository.js';
import categoryError from '../../errors/challenge/category.error.js';

const getChallengeCategories = async category_id => {
  const categories = await categoryRepository.getAllCategories(category_id);
  if (!categories) {
    throw new categoryError.CategoryFoundError('카테고리를 찾을 수 없습니다.', { category_id });
  }
  return categories;
};

export default {
  getChallengeCategories,
};
