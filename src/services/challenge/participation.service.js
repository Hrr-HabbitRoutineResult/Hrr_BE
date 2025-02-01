import listRepository from '../../repositories/challenge/list.repository.js';
import participationRepository from '../../repositories/challenge/participation.repository.js';
import participationDto from '../../dtos/challenge/participation.dto.js';
import participationError from '../../errors/challenge/participation.error.js';

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
  const user_verification = await participationRepository.findUserVerificationStatus(user_id, challenge_id);
  const response_data = participationDto.userVerificationDto(user_verification);
  return response_data;
};

export default {
  joinChallenge,
  increaseChallengeLike,
  decreaseChallengeLike,
  getChallengerList,
  getUserChallengeVerificationbyId,
};
