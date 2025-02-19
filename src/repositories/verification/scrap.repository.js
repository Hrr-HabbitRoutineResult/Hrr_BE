import { prisma } from '../../db.config.js';
import databaseError from '../../errors/database.error.js';
import scrapError from '../../errors/verification/scrap.error.js';
import logger from '../../logger.js';

const scrapVerification = async (user_id, verification_id) => {
  try {
    return await prisma.$transaction([
      prisma.verificationScrap.create({
        data: {
          user_id: user_id,
          verification_id: verification_id,
        },
      }),
      prisma.verification.update({
        where: { id: verification_id },
        data: { scrapsCount: { increment: 1 } },
      }),
    ]);
  } catch (error) {
    logger.error(error);
    throw new databaseError.DataBaseError('Database error occurred while following user');
  }
};

const unscrapVerification = async (user_id, verification_id) => {
  try {
    return await prisma.$transaction([
      prisma.verificationScrap.delete({
        where: {
          user_id_verification_id: { user_id, verification_id },
        },
      }),
      prisma.verification.update({
        where: {
          id: verification_id,
          scrapsCount: { gt: 0 },
        },
        data: { scrapsCount: { decrement: 1 } },
      }),
    ]);
  } catch (error) {
    logger.error(error);
    if (error.code === 'P2025') {
      throw new scrapError.VerificationScrapsUnderZeroError('스크랩 수가 음수가 되었습니다.');
    }
    throw new databaseError.DataBaseError('Database error occurred while unscraping verifications');
  }
};

const checkVerificationScraped = async (user_id, verification_id) => {
  try {
    const verification_scraped = await prisma.verificationScrap.findUnique({
      where: {
        user_id_verification_id: {
          user_id,
          verification_id,
        },
      },
    });
    if (verification_scraped) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    logger.error(error);
    throw new databaseError.DataBaseError('Database error occurred while following user');
  }
};

export default {
  scrapVerification,
  unscrapVerification,
  checkVerificationScraped,
};
