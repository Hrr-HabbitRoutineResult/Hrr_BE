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

const getChallengeDetailById = async challenge_id => {
  const challenge_info = await prisma.challenge.findUnique({
    where: { id: challenge_id },
  });
  return challenge_info;
};

export default {
  createChallenge,
  getChallengeDetailById,
};
