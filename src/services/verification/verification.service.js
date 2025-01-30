import verificationRepository from '../../repositories/verification/verification.repository.js';
import listRepository from '../../repositories/challenge/list.repository.js';
import listError from '../../errors/challenge/list.error.js';

const verifyWithCamera = async dto => {
  const challenge = await listRepository.getChallengeDetailById(dto.challenge_id);
  if (!challenge) {
    throw new listError.ChallengeIdNotExistsError('cannot find challenge when verifing with camera');
  }
  if (challenge.verification_type != 'camera') {
    throw new Error();
  }
  const camera_verification = await verificationRepository.verifyWithCamera(dto);
  return camera_verification;
};

export default {
  verifyWithCamera,
};
