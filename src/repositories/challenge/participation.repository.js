import { prisma } from '../../db.config.js';
import participationError, { DataBaseError } from '../../errors/challenge/participation.error.js';
import logger from '../../logger.js';

const joinChallenge = async data => {
  try {
    return await prisma.$transaction(async prisma => {
      await prisma.userChallenge.create({
        data: data,
      });

      const joined_challenge = await prisma.challenge.update({
        where: { id: data.challenge_id },
        data: { currentParticipants: { increment: 1 } },
      });

      return joined_challenge;
    });
  } catch (error) {
    logger.error(error);
    throw new participationError.DataBaseError('Error on creating userChallenge and updating currentParticipant');
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
    logger.error(error);
    throw new participationError.DataBaseError('Failed to fetch user challenge');
  }
};

const createChallengeLike = async (user_id, challenge_id) => {
  try {
    const created_challenge_like = await prisma.challengeLike.create({
      data: {
        user_id,
        challenge_id,
      },
    });
    return created_challenge_like;
  } catch (error) {
    logger.error(error);
    throw new participationError.DataBaseError('Error on creating challenge likes');
  }
};

const deleteChallengeLike = async (user_id, challenge_id) => {
  try {
    const deleted_challenge_like = await prisma.challengeLike.deleteMany({
      where: {
        user_id,
        challenge_id,
      },
    });
    return deleted_challenge_like;
  } catch (error) {
    logger.error(error);
    throw new participationError.DataBaseError('Error on deleting challenge likes');
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
    return updated_challenge.likesCount;
  } catch (error) {
    logger.error(error);
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
    return updated_challenge.likesCount;
  } catch (error) {
    logger.error(error);
    throw new participationError.DataBaseError('Error on decrementing challenge likes');
  }
};

const getChallengeLike = async (user_id, challenge_id) => {
  try {
    const challenge_like = await prisma.challengeLike.findFirst({
      where: {
        user_id,
        challenge_id,
      },
    });
    return challenge_like;
  } catch (error) {
    logger.error(error);
    throw new participationError.DataBaseError('Failed to fetch user challenge likes');
  }
};

const getChallengeList = async challenge_id => {
  try {
    const challenger_list = await prisma.userChallenge.findMany({
      where: { challenge_id },
      select: {
        owner: true,
        user: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
    });

    // Boolean 값이 true인 항목을 맨 앞으로 정렬
    challenger_list.sort((a, b) => b.owner - a.owner);

    // owner 값과 함께 반환
    return challenger_list.map(challenger => ({
      id: challenger.user.id,
      nickname: challenger.user.nickname,
      owner: challenger.owner,
    }));
  } catch (error) {
    logger.error(error);
    throw new DataBaseError.DataBaseError('Failed to fetch challenge participants');
  }
};

const findUserInfoForVerification = async user_id => {
  try {
    // User Info 조회
    const user_info = await prisma.user.findUnique({
      where: { id: user_id },
      select: {
        id: true,
        nickname: true,
        profilePhoto: true,
      },
    });
    return user_info;
  } catch (error) {
    logger.error(error);
    throw new participationError.DataBaseError('Database error occurred while fetching user verification status');
  }
};

const findUserVerificationCount = async (user_id, challenge_id) => {
  try {
    // 인증 횟수, 경고 횟수, 달성률 조회
    const user_challenge = await prisma.userChallenge.findFirst({
      where: { user_id, challenge_id },
      select: {
        id: true,
        verifyCount: true,
        warn: true,
      },
    });
    return user_challenge;
  } catch (error) {
    logger.error(error);
    throw new participationError.DataBaseError('Database error occurred while fetching user verification status');
  }
};

const findUserChallengeProgress = async challenge_id => {
  try {
    // 달성률
    const achievement_rate = await prisma.challenge.findUnique({
      where: { id: challenge_id },
      select: {
        joinDate: true,
        endDate: true,
      },
    });
    return achievement_rate;
  } catch (error) {
    logger.error(error);
    throw new participationError.DataBaseError('Database error occurred while fetching user verification status');
  }
};

const getVerifiedDays = async (user_id, challenge_id, start_date, end_date) => {
  try {
    return await prisma.verification.findMany({
      where: {
        user_id: user_id,
        userChallenge: { challenge_id: challenge_id },
        verificationStatus: 'certified', // certified 인증만 조회
        created_at: {
          gte: start_date,
          lte: end_date,
        },
      },
      select: {
        created_at: true,
      },
    });
  } catch (error) {
    throw new participationError.DataBaseError('Error fetching verified days');
  }
};

const getChallengeFrequencies = async challenge_id => {
  try {
    const frequency = await prisma.frequency.findFirst({
      where: { challenge_id: challenge_id },
      select: {
        sunday: true,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
      },
    });
    return frequency || {};
  } catch (error) {
    throw new participationError.DataBaseError('Error fetching challenge frequencies');
  }
};

// 해당 날짜의 challengeId가 동일하고 verificationStatus가 certified인 인증만 조회
const getWeeklyRecords = async (challenge_id, date) => {
  try {
    return await prisma.verification.findMany({
      where: {
        userChallenge: { challenge_id: challenge_id },
        verificationStatus: 'certified', // 인증된 것만 조회
        created_at: {
          gte: new Date(date + 'T00:00:00.000Z'),
          lte: new Date(date + 'T23:59:59.999Z'),
        },
      },
      select: {
        id: true,
        user_id: true,
        photoUrl: true,
        title: true,
        textUrl: true,
        verificationStatus: true,
      },
    });
  } catch (error) {
    throw new participationError.DataBaseError(`Error fetching records for ${date}`);
  }
};

export default {
  joinChallenge,
  getUserChallengeById,
  createChallengeLike,
  increaseChallengeLike,
  decreaseChallengeLike,
  getChallengeLike,
  deleteChallengeLike,
  getChallengeList,
  findUserInfoForVerification,
  findUserVerificationCount,
  findUserChallengeProgress,
  getVerifiedDays,
  getChallengeFrequencies,
  getWeeklyRecords,
};
