import { prisma } from '../../db.config.js';
import listError from '../../errors/challenge/list.error.js';

//챌린지 생성 함수
const createChallenge = async data => {
  try {
    const created_challenge = await prisma.challenge.create({
      data: data,
    });
    return created_challenge;
  } catch (error) {
    throw new listError.DataBaseError('Error on creating challenge');
  }
};

//챌린지 리스트 조회 함수
const challengeList = async (filters, orderBy) => {
  try {
    return await prisma.challenge.findMany({
      where: filters,
      include: {
        frequencies: {
          select: {
            frequencyValue: true,
          },
        },
        challengeKeywords: {
          include: {
            keyword: true,
          },
        },
      },
      orderBy, // 정렬 조건 적용
    });
  } catch (error) {
    console.error('Error in challengeList: ', error.message);
    throw new listError.DataBaseError('Error on listing challenge');
  }
};
export default {
  createChallenge,
  challengeList,
};
