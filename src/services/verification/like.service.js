import likeRepository from '../../repositories/verification/like.repository.js';
import likeError from '../../errors/verification/like.error.js';
import likeDto from '../../dtos/verification/like.dto.js';

const likeVerification = async (user_id, verification_id) => {
  const is_verification_liked = await likeRepository.checkVerificationLiked(user_id, verification_id);
  if (is_verification_liked) {
    throw new likeError.VerificationAlreadyLikedError('해당 인증은 이미 좋아요가 눌러져 있습니다.');
  }
  const like_verification = await likeRepository.likeVerification(user_id, verification_id);
  const like_verification_response = likeDto.likeVerificationServiceToController(like_verification);
  return like_verification_response;
};

const unlikeVerification = async (user_id, verification_id) => {
  const is_verification_liked = await likeRepository.checkVerificationLiked(user_id, verification_id);
  if (!is_verification_liked) {
    throw new likeError.VerificationNotLikedError('해당 인증은 좋아요가 눌러져 있지 않습니다.');
  }
  const unlike_verification = await likeRepository.unlikeVerification(user_id, verification_id);
  const unlike_verification_response = likeDto.likeVerificationServiceToController(unlike_verification);
  return unlike_verification_response;
};

export default {
  likeVerification,
  unlikeVerification,
};
