import likeRepository from '../../repositories/challenge/like.repository.js';
import likeError from '../../errors/verification/like.error.js';
import likeDto from '../../dtos/challenge/like.dto.js';

const likeChallenge = async (user_id, challenge_id) => {
  const is_challenge_liked = await likeRepository.checkChallengeLiked(user_id, challenge_id);
  if (is_challenge_liked) {
    throw new likeError.ChallengeAlreadyLikedError('해당 챌린지는 이미 좋아요가 눌러져 있습니다.');
  }
  const like_challenge = await likeRepository.likeChallenge(user_id, challenge_id);
  const like_challenge_response = likeDto.likeChallengeServiceToController(like_challenge);
  return like_challenge_response;
};

const unlikeChallenge = async (user_id, challenge_id) => {
  const is_challenge_liked = await likeRepository.checkChallengeLiked(user_id, challenge_id);
  if (!is_challenge_liked) {
    throw new likeError.ChallengeNotLikedError('해당 챌린지는 좋아요가 눌러져 있지 않습니다.');
  }
  const unlike_challenge = await likeRepository.unlikeChallenge(user_id, challenge_id);
  const unlike_challenge_response = likeDto.likeChallengeServiceToController(unlike_challenge);
  return unlike_challenge_response;
};

export default {
  likeChallenge,
  unlikeChallenge,
};
