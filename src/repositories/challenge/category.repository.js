import { prisma } from '../../db.config.js';
import { Prisma } from '@prisma/client';
import { DataBaseError } from '../../errors/challenge/category.error.js';

const getAllCategories = async () => {
  try {
    const categories = await prisma.challenge.groupBy({
      by: ['category'],
    });
    //id 와 이름을 반환
    return categories.map((c, index) => ({
      id: index + 1,
      name: c.category,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    throw new categoryError.DataBaseError('User not found in board categories');
  }
};

export default {
  getAllCategories,
};
