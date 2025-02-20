import { prisma } from '../../db.config.js';
import databaseError from '../../errors/database.error.js';
import scrapError from '../../errors/verification/scrap.error.js';
import logger from '../../logger.js';

const scrapChallenge = async (user_id, challenge_id) => {
  try {
    return await prisma.$transaction([
      prisma.challengeScrap.create({
        data: {
          user_id: user_id,
          challenge_id: challenge_id,
        },
      }),
      prisma.challenge.update({
        where: { id: challenge_id },
        data: { scrapsCount: { increment: 1 } },
      }),
    ]);
  } catch (error) {
    logger.error(error);
    throw new databaseError.DataBaseError('Database error occurred while scrapping challenge');
  }
};

const unscrapChallenge = async (user_id, challenge_id) => {
  try {
    return await prisma.$transaction([
      prisma.challengeScrap.delete({
        where: {
          user_id_challenge_id: { user_id, challenge_id },
        },
      }),
      prisma.challenge.update({
        where: {
          id: challenge_id,
          scrapsCount: { gt: 0 },
        },
        data: { scrapsCount: { decrement: 1 } },
      }),
    ]);
  } catch (error) {
    logger.error(error);
    if (error.code === 'P2025') {
      throw new scrapError.ChallengeScrapsUnderZeroError('스크랩 수가 음수가 되었습니다.');
    }
    throw new databaseError.DataBaseError('Database error occurred while unscraping challenges');
  }
};

const checkChallengeScraped = async (user_id, challenge_id) => {
  try {
    const challenge_scraped = await prisma.challengeScrap.findUnique({
      where: {
        user_id_challenge_id: {
          user_id,
          challenge_id,
        },
      },
    });
    return !!challenge_scraped; // 값이 있으면 true, 없으면 false
  } catch (error) {
    logger.error(error);
    throw new databaseError.DataBaseError('Database error occurred while scrapping challenge');
  }
};

export default {
  scrapChallenge,
  unscrapChallenge,
  checkChallengeScraped,
};
