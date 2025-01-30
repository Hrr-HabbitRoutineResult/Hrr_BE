import { prisma } from '../../db.config.js';

const verifyWithCamera = async dto => {
  try {
    const camera_verification = await prisma.verification.create({
      data: dto,
    });
    return camera_verification;
  } catch (error) {
    throw new authError.DataBaseError('Error on creating email verification');
  }
};

export default { verifyWithCamera };
