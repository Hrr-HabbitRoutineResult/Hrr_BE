import listRepository from '../../repositories/challenge/list.repository.js';

const createChallenge = async data => {
  const created_challenge = await listRepository.createChallenge(data);
  return created_challenge;
};

const getChallengeList = async ({ type, category, status, frequencyValue, name }) => {
  const filters = {};
  if (type) filters.type = type;
  if (category) filters.category = category;
  if (status) filters.status = status;
  if (frequencyValue) {
    filters.frequencies = {
      some: {
        frequencyValue: frequencyValue,
      },
    };
  }
  if (name) {
    filters.challengeKeywords = {
      some: {
        keyword: {
          name: name,
        },
      },
    };
  }

  return await listRepository.challengeList(filters);
};

export default {
  createChallenge,
  getChallengeList,
};
