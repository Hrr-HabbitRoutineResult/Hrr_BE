import listRepository from '../../repositories/challenge/list.repository.js';
import listError from '../../errors/challenge/list.error.js';

const createChallenge = async data => {
  const created_challenge = await listRepository.createChallenge(data);
  return created_challenge;
};

const getChallengeList = async ({
  type,
  category,
  duration,
  max_participants,
  status,
  frequency_type,
  name,
  sort = 'latest',
}) => {
  const filters = {};
  if (type) filters.type = type;
  if (category) filters.category = category;
  if (duration) filters.duration = duration;
  if (max_participants) filters.maxParticipants = parseInt(max_participants, 10);
  if (status) filters.status = status;
  if (frequency_type === 'specific_days') {
    // 특정 요일 인증 조건
    if (day) {
      filters.frequencies = {
        some: {
          frequencyType: 'specificDays',
          [day]: true, // dynamic 요일 처리
        },
      };
    } else {
      throw new listError.SendChallengeError('특정 요일은 day 파라미터가 필요합니다.', challenge_id);
    }
  } else if (frequency_type === 'weekly_count') {
    // 주 몇 회 인증 조건
    filters.frequencies = {
      some: {
        frequencyType: 'weeklyCount',
      },
    };
  }
  // } else if (frequency_type === 'specific_days') {
  //   // 특정 요일 인증 조건
  //   if (day) {
  //     filters.frequencies = {
  //       some: {
  //         frequencyType: 'specificDays', // 데이터베이스 컬럼명
  //         [day]: true, // monday, tuesday 등의 요일 필드
  //       },
  //     };
  //   } else {
  //     throw new Error();
  //   }
  // }
  if (name) {
    filters.challengeKeywords = {
      some: {
        keyword: {
          name: name,
        },
      },
    };
  }

  // 정렬 조건 처리 -> 고정 상태가 인기순으로 변경
  let orderBy = {};
  if (sort === 'popular') {
    orderBy = { challengeLikes: { _count: 'desc' } }; // 인기순 (좋아요 수 기준, 기본값)
  } else if (sort === 'oldest') {
    orderBy = { created_at: 'asc' }; // 오래된 순
  } else {
    orderBy = { created_at: 'desc' }; // 최신순
  }

  return await listRepository.challengeList(filters, orderBy);
};

const getChallengeDetailById = async challenge_id => {
  const challenge_detail = await listRepository.getChallengeDetailById(challenge_id);
  if (!challenge_detail) {
    throw new listError.ChallengeIdNotExistsError('해당 id의 챌린지는 존재하지 않습니다.', challenge_id);
  }
  return challenge_detail;
};

export default {
  createChallenge,
  getChallengeList,
  getChallengeDetailById,
};
