import { prisma } from '../db.config.js';
import { Prisma } from '@prisma/client';
import authError from '../errors/auth.error.js';
import userError from '../errors/users.error.js';

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

const userUnfollows = async (unfollower_user_id, unfollowed_user_id) => {
  const result = await prisma.follow.deleteMany({
    where: {
      follower_id: unfollower_user_id,
      following_id: unfollowed_user_id,
    },
  });

  // 삭제된 데이터가 없다면 예외 발생
  if (result.count === 0) {
    throw new userError.NotFollowingUserError('팔로우하지 않은 사용자입니다.');
  }

  return await prisma.$transaction([
    // 상대방의 팔로워 수 감소
    prisma.user.update({
      where: { id: unfollowed_user_id },
      data: { followerCount: { decrement: 1 } },
    }),

    // 팔로잉 수 감소
    prisma.user.update({
      where: { id: unfollower_user_id },
      data: { followingCount: { decrement: 1 } },
    }),
  ]);
};

export default {
  updateUserInfo,
  findOngoingChallenges,
  findCompletedChallenges,
  findUserTypeBadges,
  findUserCategoryBadges,
  findUserChallengeHistory,
  findUserVerificationHistory,
  userUnfollows,
};
