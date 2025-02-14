import { prisma } from '../../db.config.js';
import listError from '../../errors/challenge/list.error.js';

const createChallenge = async (data, keywords) => {
  try {
    return await prisma.$transaction(async prisma => {
      const created_challenge = await prisma.challenge.create({
        data: data,
      });
      const keyword_records = await Promise.all(
        keywords.map(async name => {
          return await prisma.keyword.upsert({
            where: { name },
            update: {},
            create: { name },
          });
        }),
      );

      await prisma.challengeKeyword.createMany({
        data: keyword_records.map(keyword => ({
          challenge_id: created_challenge.id,
          keyword_id: keyword.id,
        })),
      });

      return created_challenge;
    });
  } catch (error) {
    throw new listError.DataBaseError('Error on creating challenge and keywords');
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
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: true,
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
    throw new listError.DataBaseError('Error on listing challenge');
  }
};

const getChallengeDetailById = async challenge_id => {
  const challenge_info = await prisma.challenge.findUnique({
    where: { id: challenge_id },
  });
  return challenge_info;
};

export default {
  createChallenge,
  challengeList,
  getChallengeDetailById,
};
