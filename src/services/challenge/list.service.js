import listRepository from '../../repositories/challenge/list.repository.js';

const createChallenge = async data => {
  const created_challenge = await listRepository.createChallenge(data);
  return created_challenge;
};

const getChallengeList = async ({ type, category, status, frequencyValue, name, sort = 'latest' }) => {
  const filters = {};
  if (type) filters.type = type;
  if (category) filters.category = category;
  if (status) filters.status = status;
  if (frequencyValue) {
    filters.frequencies = {
      some: {
        frequencyValue: frequencyValue,
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

  // 정렬 조건 처리
  let orderBy = {};
  if (sort === 'popular') {
    orderBy = { challengeLikes: { _count: 'desc' } }; // 인기순 (좋아요 수 기준)
  } else if (sort === 'oldest') {
    orderBy = { created_at: 'asc' }; // 오래된 순
  } else {
    orderBy = { created_at: 'desc' }; // 최신순 (기본값)
  }

  return await listRepository.challengeList(filters, orderBy);
};

export default {
  createChallenge,
  getChallengeList,
};
