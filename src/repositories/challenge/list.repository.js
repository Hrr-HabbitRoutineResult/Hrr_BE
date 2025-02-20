import { prisma } from '../../db.config.js';
import listError from '../../errors/challenge/list.error.js';
import logger from '../../logger.js';

const createChallenge = async (data, keywords, frequency_data) => {
  try {
    return await prisma.$transaction(async prisma => {
      const created_challenge = await prisma.challenge.create({ data });
      // Keywords 생성 확인
      const keyword_records = await Promise.all(
        keywords.map(async name => {
          return await prisma.keyword.upsert({
            where: { name },
            update: {},
            create: { name },
          });
        }),
      );
      // Frequencies 생성 확인
      if (frequency_data) {
        await prisma.frequency.create({
          data: {
            challenge_id: created_challenge.id,
            ...frequency_data,
          },
        });
      }
      return {
        challenge: created_challenge,
        keywords: keyword_records,
        frequency: frequency_data,
      };
    });
  } catch (error) {
    logger.error(error);
    throw new listError.DataBaseError('Error on creating challenge and keywords');
  }
};

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
    logger.error(error);
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
