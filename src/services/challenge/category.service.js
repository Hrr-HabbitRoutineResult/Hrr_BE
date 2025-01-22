import categoryRepository from '../../repositories/challenge/category.repository.js';

const getChallengeCategories = async () => {
  try {
    return await categoryRepository.getAllCategories();
  } catch (error) {
    console.error('Error in category service:', error.message);
    throw new Error('SERVICE_ERROR');
  }
};

export default {
  getChallengeCategories,
};
