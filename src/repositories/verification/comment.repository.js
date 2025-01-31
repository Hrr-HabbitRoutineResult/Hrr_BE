import { prisma } from '../../db.config.js';
import databaseError from '../../errors/database.error.js';

const postVerificationComment = async request_data => {
  try {
    return await prisma.$transaction([
      prisma.comment.create({
        data: request_data,
      }),
      prisma.verification.update({
        where: { id: request_data.verification_id },
        data: { commentsCount: { increment: 1 } },
      }),
    ]);
  } catch (error) {
    if (error.code === 'P2025') {
      throw new databaseError.DataBaseNotExistError('해당 인증이 존재하지 않습니다.');
    }
    throw new databaseError.DataBaseError('Database error occurred while creating comment');
  }
};

export default {
  postVerificationComment,
};
