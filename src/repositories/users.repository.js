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

const findUserChallengeHistory = async user_id => {
  try {
    // userchallenge 테이블에서 데이터 가져오기
    const userChallenges = await prisma.userChallenge.findMany({
      where: { user_id },
      include: {
        challenge: {
          select: {
            name: true,
          },
        },
      },
    });

    return userChallenges;
  } catch (error) {
    throw new authError.DataBaseError('DataBase Error on updating user information');
  }
};

const findUserVerificationHistory = async user_id => {
  try {
    // verification 테이블에서 데이터 가져오기
    const verifications = await prisma.verification.findMany({
      where: {
        user_id,
      },
      select: {
        id: true,
        created_at: true,
        title: true,
        photoUrl: true,
        textUrl: true,
        userChallenge_id: true,
      },
    });

    return verifications;
  } catch (error) {
    throw new authError.DataBaseError('DataBase Error on updating user information');
  }
};

const findUserTypeBadges = async user_id => {
  try {
    const badges = await prisma.userBadge
      .findMany({
        where: {
          user_id,
          badge: { type: 'type' },
        },
        select: {
          isObtained: true,
          badge: {
            select: {
              id: true,
              name: true,
              icon: true,
            },
          },
        },
      })
      .then(userBadges =>
        userBadges.map(ub => ({
          id: ub.badge.id,
          name: ub.badge.name,
          icon: ub.badge.icon,
          isObtained: ub.isObtained,
        })),
      );

    return badges;
  } catch (error) {
    throw new authError.DataBaseError('DataBase Error on retrieving badge information');
  }
};

const findUserCategoryBadges = async user_id => {
  try {
    const badges = await prisma.userBadge
      .findMany({
        where: {
          user_id,
          badge: { type: 'category' },
        },
        select: {
          isObtained: true,
          badge: {
            select: {
              id: true,
              name: true,
              icon: true,
            },
          },
        },
      })
      .then(userBadges =>
        userBadges.map(ub => ({
          id: ub.badge.id,
          name: ub.badge.name,
          icon: ub.badge.icon,
          isObtained: ub.isObtained,
        })),
      );

    return badges;
  } catch (error) {
    throw new authError.DataBaseError('DataBase Error on retrieving badge information');
  }
};

export default {
  updateUserInfo,
  findOngoingChallenges,
  findCompletedChallenges,
  findUserTypeBadges,
  findUserCategoryBadges,
  findUserChallengeHistory,
  findUserVerificationHistory,
};
