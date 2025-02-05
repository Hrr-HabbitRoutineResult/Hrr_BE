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

export default {
  verifyWithCamera,
  verifyWithText,
  getSpecificVerification,
};
