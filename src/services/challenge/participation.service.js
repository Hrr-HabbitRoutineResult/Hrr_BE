import { ChallengeStatus } from '@prisma/client';
import participationRepository from '../../repositories/challenge/participation.repository.js';
import participationDto from '../../dtos/challenge/participation.dto.js';

const joinChallenge = async (user_id, challenge_id) => {
  // 챌린지 정보 가져오기
  const challenge_info = await listRepository.getChallengeDetail(challenge_id);

  let challenge_status = 'ongoing';
  let challenge_end_date = challenge_info.endDate;
  const current_time = new Date(); // 현재 시간
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
      case 'month_2':
        challenge_end_date = new Date(current_time.setMonth(current_time.getMonth() + 2)); // 2달 후
        break;
      case 'month_3':
        challenge_end_date = new Date(current_time.setMonth(current_time.getMonth() + 3)); // 3달 후
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
    start_date,
    challenge_end_date,
  );

  // 참여 챌린지 저장
  const join_challenge = await participationRepository.joinChallenge(data);

  return join_challenge;
};

export default {
  joinChallenge,
};
