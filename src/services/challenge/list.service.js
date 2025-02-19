import listRepository from '../../repositories/challenge/list.repository.js';
import listError from '../../errors/challenge/list.error.js';
const createChallenge = async (data, keywords) => {
  const created_challenge = await listRepository.createChallenge(data, keywords);
  return created_challenge;
};

const getChallengeList = async ({
  type,
  category,
  duration,
  max_participants,
  status,
  frequency_type,
  day,
  name,
  sort = 'popular',
}) => {
  const filters = {};
  if (type) filters.type = type;
  if (category) filters.category = category;
  if (max_participants) filters.maxParticipants = parseInt(max_participants, 10);
  if (status) filters.status = status;
  // 챌린지 기간 필터 적용 (전체 검색 제외)
  if (duration && duration !== '전체') {
    if (type === 'basic') {
      // 기본 챌린지는 duration 값 그대로 필터 적용
      filters.duration = duration;
    } else if (type === 'study') {
      // 스터디 챌린지는 joinDate와 endDate를 이용하여 필터 적용
      const durationDays = getStudyDurationDays(duration);
      if (durationDays) {
        filters.AND = [
          { joinDate: { not: null } },
          { endDate: { not: null } },
          { endDate: { gte: { joinDate: { plus: durationDays } } } },
          { endDate: { lt: { joinDate: { plus: durationDays + 7 } } } },
        ];
      }
    }
  }
  // 챌린지 빈도 필터 적용 (전체 검색 제외)
  if (frequency_type && frequency_type !== '전체') {
    if (type === 'basic') {
      filters.frequencies = {
        some: {
          frequencyValue: frequency_type, // 베이직 챌린지는 enum 값 그대로 사용
        },
      };
    } else if (type === 'study') {
      // 스터디 챌린지는 요일 필터 적용
      const daysFilter = getStudyFrequencyFilter(frequency_type);
      if (daysFilter.length > 0) {
        filters.frequencies = {
          some: {
            OR: daysFilter.map(day => ({ [day]: true })),
          },
        };
      }
    }
  }
  // 요일 필터 적용 (전체 검색 제외)
  if (day && day !== '전체') {
    const selectedDays = day.split(',').map(d => getDayMapping(d));
    filters.frequencies = {
      some: {
        OR: selectedDays.map(d => ({ [d]: true })),
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
  let orderBy = { challengeLikes: { _count: 'desc' } };

  if (sort === 'latest') {
    orderBy = { created_at: 'desc' }; // 최신순
  } else if (sort === 'oldest') {
    orderBy = { created_at: 'asc' }; // 오래된 순
  } else if (sort === 'popular') {
    orderBy = { challengeLikes: { _count: 'desc' } }; // 인기순 (좋아요 수 기준, 기본값)
  }

  const challenges = await listRepository.challengeList(filters, orderBy);
  // 조회된 챌린지가 없으면 에러 발생!
  if (!challenges || challenges.length === 0) {
    throw new listError.NoChallengeFoundError('챌린지가 존재하지 않습니다.');
  }

  return challenges;
};

//챌린지 기간을 필터링하기 위한 변환 함수
const getStudyDurationDays = duration => {
  const durationMap = {
    '1주일': 7,
    '2주일': 14,
    '3주일': 21,
    '1개월': 31,
    '3개월': 90,
    '6개월': 181,
    '1년': 365,
  };
  return durationMap[duration] || null;
};

//요일 문자열을 데이터베이스 필드명으로 변환
const getDayMapping = day => {
  const dayMap = {
    월: 'monday',
    화: 'tuesday',
    수: 'wednesday',
    목: 'thursday',
    금: 'friday',
    토: 'saturday',
    일: 'sunday',
  };
  return dayMap[day] || null;
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
