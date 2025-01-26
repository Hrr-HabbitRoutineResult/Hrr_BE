import participationRepository from '../../repositories/challenge/participation.repository.js';

const increaseChallengeLike = async (user_id, challenge_id) => {
  const like_challenge = await participationRepository.createChallengeLike(user_id, challenge_id);
  const update_challenge_like = await participationRepository.increaseChallengeLike(challenge_id);
  return { like_challenge, update_challenge_like };
};

export default {
  increaseChallengeLike,
};
