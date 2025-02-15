import { prisma } from '../../db.config.js';
import { Category } from '@prisma/client';
import categoryError from '../../errors/challenge/category.error.js';

const getAllCategories = async () => {
  try {
    // Prisma Enum에서 직접 카테고리 값 가져오기
    const allCategories = Object.values(Category).map((value, index) => ({
      id: index + 1,
      name: getCategoryName(value),
    }));

    // '전체보기' 추가
    const result = [{ id: 0, name: '전체보기' }, ...allCategories];

    return result;
  } catch (error) {
    throw new categoryError.DataBaseError('카테고리를 불러오는 중 오류가 발생했습니다..');
  }
};

// Enum 값을 한국어로 변환하는 함수
const getCategoryName = category => {
  const categoryMap = {
    exercise: '운동',
    study: '학업',
    jobPreparation: '취업준비',
    lifestyle: '생활습관',
    hobby: '취미',
  };
  return categoryMap[category] || category;
};

const getDailyHotChallenge = async (yesterday_start, yesterday_end) => {
  try {
    const categories = Object.values(PrismaCategory);

    const challenges = await Promise.all(
      categories.map(async category => {
        const data = await prisma.challenge.findMany({
          where: {
            category: category,
            challengeLikes: {
              some: {
                created_at: {
                  gte: yesterday_start,
                  lte: yesterday_end,
                },
              },
            },
          },
          include: {
            challengeLikes: true, // 좋아요 데이터 포함
          },
          orderBy: {
            challengeLikes: {
              _count: 'desc',
            },
          },
          take: 1, // 카테고리별 1개만 가져오기
        });
        return data[0] || null;
      }),
    );

    return challenges.filter(challenge => challenge !== null);
  } catch (error) {
    throw new categoryError.SendCategoryError('챌린지를 불러오는 중 오류가 발생했습니다.');
  }
};

export default {
  getAllCategories,
  getDailyHotChallenge,
};
