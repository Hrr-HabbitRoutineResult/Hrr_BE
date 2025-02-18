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

import { startOfDay, endOfDay } from 'date-fns';

const findOngoingChallenges = async user_id => {
  try {
    // 오늘 날짜의 시작과 끝을 구함
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    return prisma.userChallenge
      .findMany({
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
            },
          },
          // 오늘 날짜의 verification이 있는지 확인
          verification: {
            select: {
              id: true, // verification이 존재하는지만 확인하면 되므로 id만 선택
            },
            where: {
              user_id,
              created_at: {
                gte: todayStart,
                lte: todayEnd,
              },
            },
          },
        },
      })
      .then(challenges =>
        challenges.map(challenge => ({
          challenge_id: challenge.challenge_id,
          challenge: challenge.challenge,
          hasVerificationToday: challenge.verification.length > 0, // 오늘 인증 여부
        })),
      );
  } catch (error) {
    throw new authError.DataBaseError('DataBase Error finding ongoing challenges');
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
    throw new authError.DataBaseError('DataBase Error on finding completed challenges');
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

const findUserLatestBadge = async user_id => {
  try {
    return prisma.userBadge.findFirst({
      where: { user_id },
      orderBy: { created_at: 'desc' },
      select: {
        badge: {
          select: {
            id: true,
            name: true,
            icon: true,
            type: true,
          },
        },
      },
    });
  } catch (error) {
    throw new databaseError.DataBaseError('DataBase Error on retrieving latest badge information');
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

const findUserBadgesCondition = async (user_id, badge_id) => {
  try {
    return await prisma.userBadgeCondition.findMany({
      where: {
        userBadge: {
          user_id: user_id,
          badge_id: badge_id,
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

const updateUserBadgeStatus = async (user_id, badge_id) => {
  try {
    // 해당 user_id, badge_id의 모든 조건 조회
    const conditions = await prisma.userBadgeCondition.findMany({
      where: {
        userBadge: {
          user_id,
          badge_id,
        },
      },
      select: {
        isAchieved: true,
      },
    });

    // 모든 조건의 isAchieved가 true인지 확인
    const all_achieved = conditions.every(cond => cond.isAchieved);

    if (all_achieved) {
      // userBadge 테이블의 isObtained 업데이트
      const badge_obtained = await prisma.userBadge.updateMany({
        where: {
          user_id,
          badge_id,
        },
        data: {
          isObtained: true,
        },
      });
      return badge_obtained;
    }
  } catch (error) {
    throw new databaseError.DataBaseError('Database Error on updating user badge status');
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

const getUserVerificationScraps = async user_id => {
  try {
    const scrapped_verifications = await prisma.verificationScrap.findMany({
      where: { user_id },
      select: {
        id: true,
        verification: {
          select: {
            id: true,
            title: true,
            content: true,
            verificationStatus: true,
            created_at: true,
          },
        },
      },
    });

    return scrapped_verifications;
  } catch (error) {
    throw new databaseError.DataBaseError('Error on finding scrapped verifications');
  }
};

const getUserVerificationLikes = async user_id => {
  try {
    const liked_verifications = await prisma.verificationLike.findMany({
      where: { user_id },
      select: {
        id: true,
        verification: {
          select: {
            id: true,
            title: true,
            content: true,
            verificationStatus: true,
            created_at: true,
          },
        },
      },
    });

    return liked_verifications;
  } catch (error) {
    throw new databaseError.DataBaseError('Error on finding liked verifications');
  }
};

const getFollowerList = async user_id => {
  try {
    const followers = await prisma.follow.findMany({
      where: {
        following_id: user_id,
      },
      include: {
        follower: {
          select: {
            id: true,
            nickname: true,
            profilePhoto: true,
          },
        },
      },
    });
    return followers;
  } catch (error) {
    throw new databaseError.DataBaseError('Error fetching followers');
  }
};

const getFollowingList = async user_id => {
  try {
    const followings = await prisma.follow.findMany({
      where: {
        follower_id: user_id,
      },
      include: {
        following: {
          select: {
            id: true,
            nickname: true,
            profilePhoto: true,
          },
        },
      },
    });
    return followings;
  } catch (error) {
    throw new databaseError.DataBaseError('Error fetching followers');
  }
};

/**
 * 특정 사용자가 다른 사용자를 차단했는지 확인
 */
const isUserBlocked = async (blockerId, blockedId) => {
  return await prisma.block.findUnique({
    where: {
      blocker_id_blocked_id: {
        blocker_id: blockerId,
        blocked_id: blockedId,
      },
    },
  });
};

/**
 * 사용자를 차단하는 함수
 */
const createBlock = async (user_id, block_user_id) => {
  return await prisma.block.create({
    data: {
      blocker_id: user_id,
      blocked_id: block_user_id,
    },
  });
};

const deleteBlock = async (user_id, unblock_user_id) => {
  return prisma.block.delete({
    where: {
      blocker_id_blocked_id: {
        blocker_id: user_id,
        blocked_id: unblock_user_id,
      },
    },
  });
};

const getBlockedList = async user_id => {
  try {
    const blocked_list = await prisma.block.findMany({
      where: {
        blocker_id: user_id,
      },
      include: {
        blocked: {
          select: {
            id: true,
            nickname: true,
            profilePhoto: true,
          },
        },
      },
    });
    return blocked_list;
  } catch (error) {
    console.log(error);
    throw new databaseError.DataBaseError('Error fetching blocked list');
  }
};
const userQuit = async user_id => {
  try {
    return await prisma.user.update({
      where: { id: user_id },
      data: {
        isDeleted: true, // 회원 탈퇴 처리
        deletedAt: new Date(), // 현재 시간 기록
      },
      select: {
        id: true,
        isDeleted: true,
        deletedAt: true,
      },
    });
  } catch (error) {
    throw new databaseError.DataBaseError(`Error during user quit: ${error.message}`);
  }
};

export default {
  updateUserInfo,
  findOngoingChallenges,
  findCompletedChallenges,
  findUserTypeBadges,
  findUserCategoryBadges,
  findUserLatestBadge,
  findUserChallengeHistory,
  findUserVerificationHistory,
  createUserFollows,
  userUnfollows,
  findUserBadgesCondition,
  updateUserBadgeStatus,
  findUserLevel,
  getUserVerificationScraps,
  getUserVerificationLikes,
  getFollowerList,
  getFollowingList,
  isUserBlocked,
  createBlock,
  deleteBlock,
  getBlockedList,
  userQuit,
};
