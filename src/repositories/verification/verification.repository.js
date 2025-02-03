import { prisma } from '../../db.config.js';
import databaseError from '../../errors/database.error.js';

const verifyWithCamera = async dto => {
  try {
    const camera_verification = await prisma.verification.create({
      data: dto,
    });
    return camera_verification;
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

export default {
  verifyWithCamera,
  verifyWithText,
};
