import verificationRepository from '../../repositories/verification/verification.repository.js';
import listRepository from '../../repositories/challenge/list.repository.js';
import listError from '../../errors/challenge/list.error.js';
import verificationError from '../../errors/verification/verification.error.js';
import participationRepository from '../../repositories/challenge/participation.repository.js';
import verificationDto from '../../dtos/verification/verification.dto.js';
import commentRepository from '../../repositories/verification/comment.repository.js';
import prisma from '../../db.config.js';

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

const getWeeklyVerification = async (challenge_id, user_id) => {
  const now = new Date();
  now.setUTCHours(now.getUTCHours() + 9); // KST 변환

  // 이번 주 월요일 00:00:00 (KST 기준)
  const start_of_week = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - now.getUTCDay() + 1, 0, 0, 0),
  );

  // 이번 주 일요일 23:59:59 (KST 기준)
  const end_of_week = new Date(
    Date.UTC(
      start_of_week.getUTCFullYear(),
      start_of_week.getUTCMonth(),
      start_of_week.getUTCDate() + 6,
      23,
      59,
      59,
      999,
    ),
  );

  // 인증 내역 가져오기
  const verifications = await prisma.verification.findMany({
    where: {
      userChallenge: { challenge_id: parseInt(challenge_id, 10) },
      user_id: parseInt(user_id, 10),
      verificationStatus: 'certified',
      created_at: {
        gte: start_of_week,
        lte: end_of_week,
      },
    },
    select: {
      created_at: true,
    },
  });

  // `challengeId`에 해당하는 Frequencies 모델의 요일 값 가져오기
  const frequency_info = await prisma.frequency.findFirst({
    where: { challenge_id: parseInt(challenge_id, 10) },
    select: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
  });

  if (!frequency_info) {
    throw new verificationError.VerificationFrequencyNotExistsError(
      `No frequency data found for challengeId: ${challenge_id}`,
    );
  }

  // Frequencies에서 `1`(true)인 요일만 필터링
  const need_certified = Object.entries(frequency_info) // frequencyInfo가 null일 수도 있으니 기본값 설정
    .filter(([_, value]) => value) // 값이 `true(1)`인 것만 필터링
    .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1)); // "monday" → "Monday"

  // 사용자가 인증한 요일 가져오기
  const checked_days = verifications.map(verification => {
    const createdAtUTC = new Date(verification.created_at);
    const createdAtKST = new Date(createdAtUTC.getTime() - 9 * 60 * 60 * 1000); // UTC → KST 변환
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][createdAtKST.getUTCDay()];
  });

  return {
    challenge_id,
    user_id,
    need_certified: need_certified.length > 0 ? need_certified : null, // 요일이 없으면 null
    checked_days: [...new Set(checked_days)], // 중복 제거
  };
};

export default {
  verifyWithCamera,
  verifyWithText,
  getSpecificVerification,
  getChallengeVerifications,
  getWeeklyVerification,
};
