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
