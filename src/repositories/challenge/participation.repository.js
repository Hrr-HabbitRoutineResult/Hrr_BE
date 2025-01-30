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
    console.error('Error fetching challenge participants:', error);
    throw new Error('Failed to fetch challenge participants');
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
};
