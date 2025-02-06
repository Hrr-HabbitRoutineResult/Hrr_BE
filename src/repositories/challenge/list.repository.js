import { prisma } from '../../db.config.js';
import listError from '../../errors/challenge/list.error.js';

const createChallenge = async (data, keywords) => {
  try {
    return await prisma.$transaction(async prisma => {
      // 1️⃣ 챌린지 생성
      const created_challenge = await prisma.challenge.create({
        data: data,
      });
      console.log(keywords);
      // 2️⃣ 키워드 생성 또는 조회 (중복 방지)
      const keywordRecords = await Promise.all(
        keywords.map(async name => {
          console.log(name);
          return await prisma.keyword.upsert({
            where: { name },
            update: {},
            create: { name },
          });
        }),
      );

      // 3️⃣ ChallengeKeyword 관계 저장
      console.log(created_challenge);
      await prisma.challengeKeyword.createMany({
        data: keywordRecords.map(keyword => ({
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
