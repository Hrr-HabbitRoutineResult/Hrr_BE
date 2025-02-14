import categoryRepository from '../../repositories/challenge/category.repository.js';
import categoryError from '../../errors/challenge/category.error.js';
import { Category as PrismaCategory } from '@prisma/client';
import prisma from '../../db.config.js';

const getChallengeCategories = async category_id => {
  const categories = await categoryRepository.getAllCategories(category_id);
  if (!categories) {
    throw new categoryError.CategoryFoundError('카테고리를 찾을 수 없습니다.', { category_id });
  }
  return categories;
};

const getDailyHotChallenge = async () => {
  try {
    // 정확한 한국 시간(KST) 기준으로 전날 00:00 ~ 23:59:59 계산
    const now = new Date();
    now.setHours(now.getHours() + 9); // KST 변환
    const yesterday_start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 0, 0, 0));
    const yesterday_end = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1, 23, 59, 59, 999),
    );

    const categories = Object.values(PrismaCategory);
    const hot_challenges = await Promise.all(
      categories.map(async category => {
        // 해당 카테고리의 챌린지 조회
        const challenges = await prisma.challenge.findMany({
          where: {
            category: category,
          },
          include: {
            challengeLikes: {
              where: {
                created_at: {
                  gte: yesterday_start,
                  lte: yesterday_end,
                },
              },
            },
            frequencies: true, //인증 빈도 데이터 포함
          },
        });
        // 좋아요 개수 기준으로 정렬
        const sorted_challenges = challenges
          .map(challenge => ({
            ...challenge,
            likes_yesterday: challenge.challengeLikes.length,
          }))
          .sort((a, b) => b.likes_yesterday - a.likes_yesterday);

        // 가장 좋아요가 많은 챌린지 선택 (없으면 해당 카테고리에서 아무 챌린지나 반환)
        let top_challenge = sorted_challenges[0];

        if (!top_challenge) {
          // 좋아요 개수가 0이라도 챌린지를 하나 선택해야 함
          const fallback_challenge = await prisma.challenge.findFirst({
            where: { category: category },
          });
          top_challenge = fallback_challenge || { id: null, name: `기본 ${category} 챌린지`, category };
        }
        if (top_challenge) {
          // 🔥 챌린지 인증 빈도 가져오기
          let certification_frequency = null;
          if (top_challenge.type === 'basic') {
            certification_frequency =
              top_challenge.frequencies.length > 0 ? top_challenge.frequencies[0].frequencyValue : null;
          } else if (top_challenge.type === 'study') {
            certification_frequency =
              top_challenge.frequencies.length > 0
                ? Object.entries(top_challenge.frequencies[0])
                    .filter(
                      ([key, value]) =>
                        ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(key) &&
                        value === true,
                    )
                    .map(([key]) => key)
                : [];
          }
          // 🔥 챌린지 기간 가져오기
          let challenge_duration = null;
          if (top_challenge.type === 'basic') {
            challenge_duration = top_challenge.duration;
          } else if (top_challenge.type === 'study') {
            if (top_challenge.joinDate && top_challenge.endDate) {
              const diffDays = Math.ceil((top_challenge.endDate - top_challenge.joinDate) / (1000 * 60 * 60 * 24));
              if (diffDays <= 7) challenge_duration = '1주일';
              else if (diffDays <= 14) challenge_duration = '2주일';
              else if (diffDays <= 21) challenge_duration = '3주일';
              else if (diffDays <= 31) challenge_duration = '1개월';
              else if (diffDays <= 91) challenge_duration = '3개월';
              else if (diffDays <= 181) challenge_duration = '6개월';
              else challenge_duration = '1년';
            }
          }

          // 챌린지에 인증 빈도와 기간 추가
          top_challenge.certification_frequency = certification_frequency;
          top_challenge.challenge_duration = challenge_duration;
        }
        return top_challenge;
      }),
    );

    return hot_challenges;
  } catch (error) {
    throw new Error('오늘의 인기 챌린지를 불러오는 중 오류가 발생했습니다.');
  }
};

export default {
  getChallengeCategories,
  getDailyHotChallenge,
};
