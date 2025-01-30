import verificationRepository from '../../repositories/verification/verification.repository.js';
import listRepository from '../../repositories/challenge/list.repository.js';
import listError from '../../errors/challenge/list.error.js';
import verificationError from '../../errors/verification/verification.error.js';
import participationRepository from '../../repositories/challenge/participation.repository.js';
import verificationDto from '../../dtos/verification/verification.dto.js';
const verifyWithCamera = async (user_id, challenge_id, body) => {
  const challenge = await listRepository.getChallengeDetailById(challenge_id);
  if (!challenge) {
    throw new listError.ChallengeIdNotExistsError('해당 챌린지를 찾을 수 없습니다.');
  }
  const user_challenge = await participationRepository.getUserChallengeById(user_id, challenge_id);
  if (!user_challenge) {
    throw new listError.ChallengeIdNotExistsError('해당 챌린지를 찾을 수 없습니다.');
  }
  const data = verificationDto.cameraVerificationServiceToRepositoryDto(user_id, user_challenge.id, body);
  if (challenge.verificationType != 'camera') {
    throw new verificationError.VerificationTypeDoesntMatchError('챌린지가 카메라 인증 타입이 아닙니다.');
  }
  const camera_verification = await verificationRepository.verifyWithCamera(data);
  return camera_verification;
};

export default {
  verifyWithCamera,
};
