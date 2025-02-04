import { prisma } from '../../db.config.js';
import databaseError from '../../errors/database.error.js';

const verifyWithCamera = async dto => {
  try {
    const result = await prisma.$transaction(async prisma => {
      const camera_verification = await prisma.verification.create({
        data: dto,
      });

      await prisma.userChallenge.update({
        where: {
          id: dto.userChallenge_id,
        },
        data: {
          verifyCount: {
            increment: 1,
          },
        },
      });

      return camera_verification;
    });

    return result;
  } catch (error) {
    throw new databaseError.DataBaseError('Error on creating camera verification');
  }
};

const verifyWithText = async dto => {
  try {
    const text_verification = await prisma.verification.create({
      data: dto,
    });
    return text_verification;
  } catch (error) {
    throw new databaseError.DataBaseError('Error on creating text verification');
  }
};

const getSpecificVerification = async verification_id => {
  const verification = await prisma.verification.findUnique({
    where: {
      id: verification_id,
    },
  });
  return verification;
};

const findChallengeVerificationCurrentParticipants = async challenge_id => {
  try {
    const status = await prisma.challenge.findUnique({
      where: {
        id: challenge_id,
      },
      select: {
        id: true,
        currentParticipants: true,
      },
    });
    return status;
  } catch (error) {
    throw new databaseError.DataBaseError('Error on finding challenge verification status');
  }
};

const findChallengeVerificationCounts = async challenge_id => {
  try {
    // 오늘의 시작과 끝 시간 구하기
    const today = new Date();
    const start_of_day = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0));
    const end_of_day = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999),
    );

    const verification_count = await prisma.verification.count({
      where: {
        userChallenge: { challenge_id: challenge_id },
        created_at: {
          gte: start_of_day, // 오늘 00:00:00 이후
          lte: end_of_day, // 오늘 23:59:59 이전
        },
      },
    });
    return verification_count;
  } catch (error) {
    throw new databaseError.DataBaseError('Error on finding challenge verification status');
  }
};

export default {
  verifyWithCamera,
  verifyWithText,
  getSpecificVerification,
  findChallengeVerificationCurrentParticipants,
  findChallengeVerificationCounts,
};
