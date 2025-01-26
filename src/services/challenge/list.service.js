import listRepository from '../../repositories/challenge/list.repository.js';
import listError from '../../errors/challenge/list.error.js';
const createChallenge = async data => {
  const created_challenge = await listRepository.createChallenge(data);
  return created_challenge;
};

const getChallengeList = async ({ type, category, status, frequency_type, name, sort = 'latest' }) => {
  const filters = {};
  if (type) filters.type = type;
  if (category) filters.category = category;
  if (status) filters.status = status;
  // Frequency 필터 추가
  if (frequency_type === 'weekly_count') {
    // 주 몇 회 인증 빈도 조건
    filters.frequencies = {
      some: {
        frequencyType: 'weeklyCount', // 데이터베이스 컬럼명
      },
    };
  } else if (frequency_type === 'specific_days' && day) {
    // 특정 요일 인증 조건
    filters.frequencies = {
      some: {
        frequencyType: 'specificDays', // 데이터베이스 컬럼명
        [day]: true, // monday, tuesday 등의 요일 필드
      },
    };
  }
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
