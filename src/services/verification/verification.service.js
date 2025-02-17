import verificationRepository from '../../repositories/verification/verification.repository.js';
import listRepository from '../../repositories/challenge/list.repository.js';
import listError from '../../errors/challenge/list.error.js';
import verificationError from '../../errors/verification/verification.error.js';
import participationRepository from '../../repositories/challenge/participation.repository.js';
import verificationDto from '../../dtos/verification/verification.dto.js';
import commentRepository from '../../repositories/verification/comment.repository.js';

const verifyWithCamera = async (user_id, challenge_id, photo_url, body) => {
  const challenge = await listRepository.getChallengeDetailById(challenge_id);
  if (!challenge) {
    throw new listError.ChallengeIdNotExistsError('해당 챌린지를 찾을 수 없습니다.');
  }
  const user_challenge = await participationRepository.getUserChallengeById(user_id, challenge_id);
  if (!user_challenge) {
    throw new listError.ChallengeIdNotExistsError('해당 챌린지를 찾을 수 없습니다.');
  }
  const data = verificationDto.cameraVerificationServiceToRepositoryDto(user_id, user_challenge.id, photo_url, body);
  if (challenge.verificationType != 'camera') {
    throw new verificationError.VerificationTypeDoesntMatchError('챌린지가 카메라 인증 타입이 아닙니다.');
  }
  const camera_verification = await verificationRepository.verifyWithCamera(data);
  const camera_verification_response = verificationDto.cameraVerificationServiceToController(camera_verification);
  return camera_verification_response;
};

const verifyWithText = async (user_id, challenge_id, body) => {
  const challenge = await listRepository.getChallengeDetailById(challenge_id);
  if (!challenge) {
    throw new listError.ChallengeIdNotExistsError('해당 챌린지를 찾을 수 없습니다.');
  }
  const user_challenge = await participationRepository.getUserChallengeById(user_id, challenge_id);
  if (!user_challenge) {
    throw new listError.ChallengeIdNotExistsError('해당 챌린지를 찾을 수 없습니다.');
  }
  const data = verificationDto.textVerificationServiceToRepositoryDto(user_id, user_challenge.id, body);
  if (challenge.verificationType != 'text') {
    throw new verificationError.VerificationTypeDoesntMatchError('챌린지가 텍스트 인증 타입이 아닙니다.');
  }
  const text_verification = await verificationRepository.verifyWithText(data);
  const text_verification_response = verificationDto.textVerificationServiceToController(text_verification);
  return text_verification_response;
};

const getSpecificVerification = async verification_id => {
  const verification = await verificationRepository.getSpecificVerification(verification_id);
  if (!verification) {
    throw new verificationError.VerificationNotExistsError('해당 ID를 가진 인증이 존재하지 않습니다.');
  }
  const comment = await commentRepository.getVerificationComment(verification.id);
  return { ...verification, comment: comment };
};

const getChallengeVerifications = async challenge_id => {
  const verification = await verificationRepository.findChallengeVerificationCurrentParticipants(challenge_id);
  if (!verification) {
    throw new verificationError.VerificationNotExistsError('해당 ID를 가진 인증이 존재하지 않습니다.');
  }
  const count = await verificationRepository.findChallengeVerificationCounts(challenge_id);
  const status = verificationDto.verificationStatusServiceToControllerDto(verification, count);
  return status;
};

const getWeeklyVerification = async (challengeId, userId) => {
  const now = new Date();
  now.setUTCHours(now.getUTCHours() + 9); // KST 변환

  // 이번 주 월요일 00:00:00 (KST 기준)
  const startOfWeek = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - now.getUTCDay() + 1, 0, 0, 0),
  );

  // 이번 주 일요일 23:59:59 (KST 기준)
  const endOfWeek = new Date(
    Date.UTC(startOfWeek.getUTCFullYear(), startOfWeek.getUTCMonth(), startOfWeek.getUTCDate() + 6, 23, 59, 59, 999),
  );

  // 인증 내역 가져오기
  const verifications = await verificationRepository.getWeeklyVerification(challengeId, userId, startOfWeek, endOfWeek);

  //UTC → KST 변환 후 정확한 요일 계산 (getDay() → getUTCDay() 수정)
  const checkedDays = verifications.map(verification => {
    const createdAtUTC = new Date(verification.created_at);
    const createdAtKST = new Date(createdAtUTC.getTime() - 9 * 60 * 60 * 1000); // UTC → KST 변환
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][createdAtKST.getUTCDay()];
  });
  return {
    challengeId,
    userId,
    checkedDays: [...new Set(checkedDays)], // 중복 제거
  };
};

export default {
  verifyWithCamera,
  verifyWithText,
  getSpecificVerification,
  getChallengeVerifications,
  getWeeklyVerification,
};
