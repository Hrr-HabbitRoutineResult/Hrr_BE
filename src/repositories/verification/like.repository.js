import { prisma } from '../../db.config.js';
import databaseError from '../../errors/database.error.js';
import likeError from '../../errors/verification/like.error.js';

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

const unlikeVerification = async (user_id, verification_id) => {
  try {
    return await prisma.$transaction([
      prisma.verificationLike.delete({
        where: {
          user_id_verification_id: { user_id, verification_id },
        },
      }),
      prisma.verification.update({
        where: {
          id: verification_id,
          likesCount: { gt: 0 },
        },
        data: { likesCount: { decrement: 1 } },
      }),
    ]);
  } catch (error) {
    if (error.code === 'P2025') {
      throw new likeError.VerificationLikesUnderZeroError('좋아요 개수가 음수가 되었습니다.');
    }
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
  unlikeVerification,
  checkVerificationLiked,
};
