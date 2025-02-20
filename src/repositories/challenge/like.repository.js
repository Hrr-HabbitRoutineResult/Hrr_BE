import { prisma } from '../../db.config.js';
import databaseError from '../../errors/database.error.js';
import likeError from '../../errors/verification/like.error.js';
import logger from '../../logger.js';

const likeChallenge = async (user_id, challenge_id) => {
  try {
    return await prisma.$transaction([
      prisma.challengeLike.create({
        data: {
          user_id: user_id,
          challenge_id: challenge_id,
        },
      }),
      prisma.challenge.update({
        where: { id: challenge_id },
        data: { likesCount: { increment: 1 } },
      }),
    ]);
  } catch (error) {
    logger.error(error);
    throw new databaseError.DataBaseError('Database error occurred while following user');
  }
};

const unlikeChallenge = async (user_id, challenge_id) => {
  try {
    return await prisma.$transaction([
      prisma.challengeLike.delete({
        where: {
          user_id_challenge_id: { user_id, challenge_id },
        },
      }),
      prisma.challenge.update({
        where: {
          id: challenge_id,
          likesCount: { gt: 0 },
        },
        data: { likesCount: { decrement: 1 } },
      }),
    ]);
  } catch (error) {
    logger.error(error);
    if (error.code === 'P2025') {
      throw new likeError.ChallengeLikesUnderZeroError('좋아요 개수가 음수가 되었습니다.');
    }
    throw new databaseError.DataBaseError('Database error occurred while unliking challenge');
  }
};

const checkChallengeLiked = async (user_id, challenge_id) => {
  try {
    const challenge_liked = await prisma.challengeLike.findUnique({
      where: {
        user_id_challenge_id: {
          user_id,
          challenge_id,
        },
      },
    });
    if (challenge_liked) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    logger.error(error);
    throw new databaseError.DataBaseError('Database error occurred while following user');
  }
};

export default {
  likeChallenge,
  unlikeChallenge,
  checkChallengeLiked,
};
