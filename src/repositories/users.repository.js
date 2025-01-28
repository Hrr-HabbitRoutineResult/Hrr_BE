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

const getUserChallenge = async () => {
  try {
    return prisma.user.findUnique({
      include: {
        userChallenges: true,
      },
    });
  } catch (error) {
    throw new authError.DataBaseError('DataBase Error on updating user information');
  }
};

const findOngoingChallenges = async user_id => {
  try {
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
  } catch (error) {
    throw new authError.DataBaseError('DataBase Error on updating user information');
  }
};

const findCompletedChallenges = async user_id => {
  try {
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
  } catch (error) {
    throw new authError.DataBaseError('DataBase Error on updating user information');
  }
};

export default {
  updateUserInfo,
  getUserChallenge,
  findOngoingChallenges,
  findCompletedChallenges,
};
