import { prisma } from '../../db.config.js';
import participationError from '../../errors/challenge/participation.error.js';

const joinChallenge = async data => {
  try {
    const created_user_challenge = await prisma.userChallenge.create({
      data: data,
    });
    return created_user_challenge;
  } catch (error) {
    throw new participationError.DataBaseError('Error on creating userChallenge');
  }
};

const getUserChallengeById = async (user_id, challenge_id) => {
  try {
    const user_challenge = await prisma.userChallenge.findFirst({
      where: {
        user_id,
        challenge_id,
      },
    });
    return user_challenge;
  } catch (error) {
    throw new participationError.DataBaseError('Failed to fetch user challenge');
  }
};

export default {
  joinChallenge,
  getUserChallengeById,
};
