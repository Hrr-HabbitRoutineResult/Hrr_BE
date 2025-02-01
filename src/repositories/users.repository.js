import { prisma } from '../db.config.js';
import { Prisma } from '@prisma/client';
import authError from '../errors/auth.error.js';
import userError from '../errors/users.error.js';
import databaseError from '../errors/database.error.js';

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

const createUserFollows = async (follower_user_id, followed_user_id) => {
  try {
    return await prisma.$transaction([
      // 팔로우 관계 추가
      prisma.follow.create({
        data: {
          follower_id: follower_user_id,
          following_id: followed_user_id,
        },
      }),
      // 상대방의 팔로워 수 증가
      prisma.user.update({
        where: { id: followed_user_id },
        data: { followerCount: { increment: 1 } },
      }),
      // 팔로잉 수 증가
      prisma.user.update({
        where: { id: follower_user_id },
        data: { followingCount: { increment: 1 } },
      }),
    ]);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new userError.FollowedUserError('이미 팔로우한 사용자입니다.');
      } else if (error.code === 'P2025') {
        throw new userError.UserNotExistError('해당 사용자를 찾을 수 없습니다.');
      }
    }

    throw new userError.DataBaseError('Database error occurred while following user');
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

const findUserBadgesCondition = async user_id => {
  try {
    return await prisma.userBadgeCondition.findMany({
      where: {
        userBadge: {
          user_id: user_id,
        },
      },
      select: {
        condition: {
          select: {
            id: true,
            badge_id: true,
            description: true,
          },
        },
        isAchieved: true,
      },
    });
  } catch (error) {
    throw new databaseError.DataBaseError('DataBase Error on retrieving badge condition');
  }
};

const findUserLevel = async userId => {
  try {
    const result = await prisma.userLevel.findMany({
      where: { userId },
      select: {
        userId: true,
        levelConditionId: true,
        achieved: true,
        user: {
          select: {
            level: true,
            points: true,
          },
        },
        levelCondition: {
          select: {
            condition: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw new databaseError.DataBaseError('DataBase Error on retrieving level');
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
  createUserFollows,
  userUnfollows,
  findUserBadgesCondition,
  findUserLevel,
};
