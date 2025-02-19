import listRepository from '../../repositories/challenge/list.repository.js';
import participationRepository from '../../repositories/challenge/participation.repository.js';
import participationDto from '../../dtos/challenge/participation.dto.js';
import participationError from '../../errors/challenge/participation.error.js';
import usersRepository from '../../repositories/users.repository.js';

const joinChallenge = async (user_id, challenge_id) => {
  // 챌린지 가입 여부 확인
  const is_participating = await participationRepository.getUserChallengeById(user_id, challenge_id);
  if (is_participating) {
    throw new participationError.UserAlreadyJoinedChallenge('User had already joined the challenge');
  }

  // 챌린지 정보 가져오기
  const challenge_info = await listRepository.getChallengeDetailById(challenge_id);
  const current_time = new Date(); // 현재 시간
  if (challenge_info.endDate < current_time) {
    throw new participationError.ChallengeExpiredError('Challenge already finished');
  }
  let challenge_status = 'ongoing';
  let challenge_end_date = challenge_info.endDate;
  let challenge_start_date;

  if (challenge_info.type == 'study') {
    challenge_start_date = challenge_info.joinDate;
    if (challenge_info.joinDate > current_time) {
      challenge_status = 'open';
    } else if (challenge_info.endDate < current_time) {
      challenge_status = 'completed';
    }
  } else {
    // 기본 챌린지의 경우 duration에 따른 종료일 계산
    challenge_start_date = current_time;
    switch (challenge_info.duration) {
      case 'week_1':
        challenge_end_date = new Date(current_time.setDate(current_time.getDate() + 7)); // 1주일 후
        break;
      case 'week_2':
        challenge_end_date = new Date(current_time.setDate(current_time.getDate() + 14)); // 2주일 후
        break;
      case 'week_3':
        challenge_end_date = new Date(current_time.setDate(current_time.getDate() + 21)); // 3주일 후
        break;
      case 'month_1':
        challenge_end_date = new Date(current_time.setMonth(current_time.getMonth() + 1)); // 1달 후
        break;
      case 'month_3':
        challenge_end_date = new Date(current_time.setMonth(current_time.getMonth() + 2)); // 2달 후
        break;
      case 'month_6':
        challenge_end_date = new Date(current_time.setMonth(current_time.getMonth() + 3)); // 3달 후
        break;
      case 'year_1':
        challenge_end_date = new Date(current_time.setMonth(current_time.getFullYear() + 1)); // 1년 후
        break;
      default:
        challenge_end_date = current_time;
    }
  }

  // 참가 요청 데이터 생성
  const data = participationDto.joinChallengeRequest(
    user_id,
    challenge_id,
    challenge_status,
    challenge_start_date,
    challenge_end_date,
  );

  // 참여 챌린지 저장
  const join_challenge = await participationRepository.joinChallenge(data);
  return join_challenge;
};

const increaseChallengeLike = async (user_id, challenge_id) => {
  const is_challenge_like_exists = await participationRepository.getChallengeLike(user_id, challenge_id);
  if (is_challenge_like_exists) {
    throw new participationError.AlreadyLikedError('User already liked the challenge');
  }
  const like_challenge = await participationRepository.createChallengeLike(user_id, challenge_id);
  const update_challenge_like = await participationRepository.increaseChallengeLike(challenge_id);
  return { ...like_challenge, update_challenge_like };
};

const decreaseChallengeLike = async (user_id, challenge_id) => {
  const is_challenge_like_exists = await participationRepository.getChallengeLike(user_id, challenge_id);
  if (!is_challenge_like_exists) {
    throw new participationError.DidntLikedError('User didnt liked the challenge');
  }
  const challenge = await listRepository.getChallengeDetailById(challenge_id);
  if (challenge.likesCount == 0) {
    throw new participationError.LikesBelowZero('Likes cannot get below zero');
  }
  const like_challenge = await participationRepository.deleteChallengeLike(user_id, challenge_id);
  const update_challenge_like = await participationRepository.decreaseChallengeLike(challenge_id);
  return { ...like_challenge, update_challenge_like };
};

const getChallengerList = async challenge_id => {
  const challenger_list = await participationRepository.getChallengeList(challenge_id);
  return challenger_list;
};

const getUserChallengeVerificationbyId = async (user_id, challenge_id) => {
  const user = await participationRepository.findUserInfoForVerification(user_id);
  const user_challenge = await participationRepository.findUserVerificationCount(user_id, challenge_id);
  if (!user_challenge) {
    return { user, achievement_rate: 0, user_challenge, verifications: [] };
  }
  const achievement_rate = await participationRepository.findUserChallengeProgress(challenge_id);
  const verification_list = await usersRepository.findUserVerificationHistory(user_id);

  const user_info = participationDto.userChallengeVerificationDto(user);
  const verification_info = participationDto.userChallengeProgressDto(user_challenge, achievement_rate);
  const challenge_verification_list = participationDto.userChallengeVerificationListDto(verification_list);

  return [user_info, verification_info, challenge_verification_list];
};

const getChallengeCalendar = async (user_id, challenge_id) => {
  // 현재 KST 날짜 가져오기
  const now = new Date();
  now.setUTCHours(now.getUTCHours() + 9); // KST 변환
  const today = now.toISOString().split('T')[0]; // "YYYY-MM-DD"

  // 이번 주 일요일(2월 16일)과 토요일(2월 22일) 계산 (KST 기준)
  const start_of_week = new Date(now);
  start_of_week.setUTCDate(now.getUTCDate() - now.getUTCDay()); // 일요일 (2/16)
  start_of_week.setUTCHours(0, 0, 0, 0);

  const end_of_week = new Date(start_of_week);
  end_of_week.setUTCDate(start_of_week.getUTCDate() + 6); // 토요일 (2/22)
  end_of_week.setUTCHours(23, 59, 59, 999);

  // 이번 주 모든 날짜 리스트 생성
  const week_range = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(start_of_week);
    date.setUTCDate(start_of_week.getUTCDate() + i);
    week_range.push({
      date: date.toISOString().split('T')[0], // "YYYY-MM-DD"
      day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][i],
    });
  }

  // 인증해야 하는 요일 조회
  const challenge_frequencies = await participationRepository.getChallengeFrequencies(challenge_id);
  const need_certified = Object.keys(challenge_frequencies)
    .filter(day => challenge_frequencies[day])
    .map(day => day.charAt(0).toUpperCase() + day.slice(1));

  // 이번 주 사용자가 인증한 날짜 조회 (certified만 조회)
  const verified_days = await participationRepository.getVerifiedDays(
    user_id,
    challenge_id,
    start_of_week,
    end_of_week,
  );
  const verified_days_formatted = verified_days.map(v => v.created_at.toISOString().split('T')[0]);

  // 이번 주 모든 챌린저들의 인증 기록 조회 (certified & challengeId 필터링)
  const weekly_records = {};
  for (const { date } of week_range) {
    const records = await participationRepository.getWeeklyRecords(challenge_id, date);
    weekly_records[date] = records
      .filter(record => record.verificationStatus === 'certified') // 인증된 것만 필터링
      .map(record => ({
        user_id: record.user_id,
        photoUrl: record.photoUrl,
        title: record.title,
        textUrl: record.textUrl,
      }));
  }

  return {
    today,
    week_range,
    challenge_id,
    user_id,
    need_certified,
    verified_days: verified_days_formatted,
    weekly_records,
  };
};
export default {
  joinChallenge,
  increaseChallengeLike,
  decreaseChallengeLike,
  getChallengerList,
  getUserChallengeVerificationbyId,
  getChallengeCalendar,
};
