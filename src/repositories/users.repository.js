import { prisma } from '../db.config.js';
import authError from '../errors/auth.error.js';

const updateUserInfo = async (email, update_data) => {
  try {
    const updated_user = await prisma.user.update({
      where: { email: email },
      data: update_data,
    });
    return updated_user;
  } catch (error) {
    throw new authError.DataBaseError('Error on modifying user information');
  }
};

const getUserChallenge = async id => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      userChallenges: true,
    },
  });
};

const findOngoingChallenges = async user_id => {
  return prisma.userChallenge.findMany({
    where: {
      user_id,
      challengeStatus: 'ongoing',
    },
    select: {
      challenge_id: true,
      challenge: {
        select: {
          name: true,
          challengeImage: true,
          type: true,
          // 인증 추가
        },
      },
    },
  });
};

const findCompletedChallenges = async user_id => {
  return prisma.userChallenge.findMany({
    where: {
      user_id,
      challengeStatus: 'completed',
    },
    select: {
      challenge_id: true,
      challenge: {
        select: {
          name: true,
          challengeImage: true,
          description: true,
        },
      },
    },
  });
};

export default {
  updateUserInfo,
  getUserChallenge,
  findOngoingChallenges,
  findCompletedChallenges,
};
