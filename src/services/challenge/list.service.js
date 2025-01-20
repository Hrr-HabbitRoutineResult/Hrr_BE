import listRepository from '../../repositories/challenge/list.repository.js';

const createChallenge = async data => {
  const created_challenge = await listRepository.createChallenge(data);
  return created_challenge;
};

export default {
  createChallenge,
};
