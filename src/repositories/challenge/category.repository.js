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

export default {
  getAllCategories,
};
