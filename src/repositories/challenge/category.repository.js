import { prisma } from '../../db.config.js';
import { Prisma } from '@prisma/client';
import categoryError from '../../errors/challenge/category.error.js';

const getAllCategories = async () => {
  try {
    const categories = await prisma.challenge.groupBy({
      by: ['category'],
    });
    //id 와 이름을 반환
    const result = categories.map((c, index) => ({
      id: index + 1,
      name: c.category,
    }));
    //전체 보기 추가 (id는 0으로 설정)
    result.unshift({
      id: 0,
      name: '전체보기',
    });
    return result;
  } catch (error) {
    throw new categoryError.DataBaseError('사용자를 카테고리에서 찾을 수 없습니다.');
  }
};

export default {
  getAllCategories,
};
