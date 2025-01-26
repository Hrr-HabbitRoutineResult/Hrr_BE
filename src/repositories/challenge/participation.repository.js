import { prisma } from '../../db.config.js';
import participationError from '../../errors/challenge/participation.error.js';

const createChallengeLike = async (user_id, challenge_id) => {
  try {
    const created_challenge_like = await prisma.challengeLike.create({
      user_id,
      challenge_id,
    });
    return created_challenge_like;
  } catch (error) {
    console.log(error);
    throw new participationError.DataBaseError('Error on creating challenge likes');
  }
};

const increaseChallengeLike = async challenge_id => {
  try {
    const updated_challenge = await prisma.challenge.update({
      where: { id: challenge_id },
      data: {
        likesCount: { increment: 1 }, // likesCount 값을 1 증가
      },
    });
    return updated_challenge;
  } catch (error) {
    throw new participationError.DataBaseError('Error on updating challenge likes');
  }
};

const decreaseChallengeLike = async challenge_id => {
  try {
    const updated_challenge = await prisma.challenge.update({
      where: { id: challenge_id },
      data: {
        likesCount: { decrement: 1 }, // likesCount 값을 1 감소
      },
    });
    return updated_challenge;
  } catch (error) {
    throw new participationError.DataBaseError('Error on decrementing challenge likes');
  }
};

export default {
  createChallengeLike,
  increaseChallengeLike,
  decreaseChallengeLike,
};
