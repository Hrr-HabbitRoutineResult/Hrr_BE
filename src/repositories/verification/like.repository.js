import { prisma } from '../../db.config.js';
import databaseError from '../../errors/database.error.js';

const likeVerification = async (user_id, verification_id) => {
  try {
    return await prisma.$transaction([
      prisma.verificationLike.create({
        data: {
          user_id: user_id,
          verification_id: verification_id,
        },
      }),
      prisma.verification.update({
        where: { id: verification_id },
        data: { likesCount: { increment: 1 } },
      }),
    ]);
  } catch (error) {
    throw new databaseError.DataBaseError('Database error occurred while following user');
  }
};

const checkVerificationLiked = async (user_id, verification_id) => {
  try {
    const verification_liked = await prisma.verificationLike.findUnique({
      where: {
        user_id_verification_id: {
          user_id,
          verification_id,
        },
      },
    });
    if (verification_liked) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new databaseError.DataBaseError('Database error occurred while following user');
  }
};

export default {
  likeVerification,
  checkVerificationLiked,
};
