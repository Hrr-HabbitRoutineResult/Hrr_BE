import listRepository from '../../repositories/challenge/list.repository.js';
import listError from '../../errors/challenge/list.error.js';
const createChallenge = async (data, keywords) => {
  const created_challenge = await listRepository.createChallenge(data, keywords);
  return created_challenge;
};

const getChallengeDetailById = async challenge_id => {
  const challenge_detail = await listRepository.getChallengeDetailById(challenge_id);
  if (!challenge_detail) {
    throw new listError.ChallengeIdNotExistsError('해당 id의 챌린지는 존재하지 않습니다.', challenge_id);
  }
  return challenge_detail;
};

export default {
  createChallenge,
  getChallengeDetailById,
};
