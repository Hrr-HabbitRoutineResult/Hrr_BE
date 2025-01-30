import { prisma } from '../../db.config.js';
import databaseError from '../../errors/database.error.js';

const verifyWithCamera = async dto => {
  try {
    const camera_verification = await prisma.verification.create({
      data: dto,
    });
    return camera_verification;
  } catch (error) {
    console.log(error);
    throw new databaseError.DataBaseError('Error on creating email verification');
  }
};

export default { verifyWithCamera };
