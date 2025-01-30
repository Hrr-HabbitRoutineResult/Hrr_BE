import verificationRepository from '../../repositories/verification/verification.repository.js';
import listRepository from '../../repositories/challenge/list.repository.js';
import listError from '../../errors/challenge/list.error.js';
import verificationError from '../../errors/verification/verification.error.js';

const verifyWithCamera = async dto => {
  const challenge = await listRepository.getChallengeDetailById(dto.challenge_id);
  if (!challenge) {
    throw new listError.ChallengeIdNotExistsError('해당 챌린지를 찾을 수 없습니다.');
  }
  if (challenge.verificationType != 'camera') {
    throw new verificationError.VerificationTypeDoesntMatchError('챌린지가 카메라 인증 타입이 아닙니다.');
  }
  const camera_verification = await verificationRepository.verifyWithCamera(dto);
  return camera_verification;
};

export default {
  verifyWithCamera,
};
