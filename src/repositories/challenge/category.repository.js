import { prisma } from '../../db.config.js';
import { Prisma } from '@prisma/client';
import categoryError from '../../errors/challenge/category.error.js';

const getAllCategories = async () => {
  try {
    const allCategories = [
      { id: 1, name: '운동', value: 'exercise' },
      { id: 2, name: '학업', value: 'study' },
      { id: 3, name: '취업준비', value: 'jobPreparation' },
      { id: 4, name: '생활습관', value: 'lifestyle' },
      { id: 5, name: '취미', value: 'hobby' },
    ];

    // DB에서 현재 존재하는 카테고리 가져오기
    const categoriesInDB = await prisma.challenge.groupBy({
      by: ['category'],
    });

    // DB에 있는 카테고리를 체크해서 해당 카테고리가 존재하면 true로 표시
    const categorySet = new Set(categoriesInDB.map(dbCat => dbCat.category));

    // 모든 카테고리 목록을 반환하되, DB에 있는 것은 그대로 포함하고, 없는 것은 빈 데이터로 유지
    const result = [
      { id: 0, name: '전체보기' }, // 전체보기 추가
      ...allCategories.map(cat => ({
        id: cat.id,
        name: cat.name,
      })),
    ];

    return result;
  } catch (error) {
    throw new categoryError.DataBaseError('카테고리를 불러오는 중 오류 발생.');
  }
};

export default {
  getAllCategories,
};
