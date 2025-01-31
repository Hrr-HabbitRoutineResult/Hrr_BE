import { prisma } from '../../db.config.js';
import databaseError from '../../errors/database.error.js';

const getVerificationComment = async verification_id => {
  try {
    const comments = await prisma.comment.findMany({
      where: { verification_id },
      orderBy: { created_at: 'asc' },
      select: {
        id: true,
        user_id: true,
        content: true,
        parent_id: true,
        created_at: true,
        updated_at: true,
        selected: true,
        anonymous: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });

    const commentMap = new Map();
    const structuredComments = [];

    comments.forEach(comment => {
      const formattedComment = {
        id: comment.id,
        user_id: comment.user_id,
        nickname: comment.user.nickname,
        content: comment.content,
        parent_id: comment.parent_id,
        created_at: comment.created_at,
        updated_at: comment.updated_at,
        selected: comment.selected,
        anonymous: comment.anonymous,
        replies: [],
      };

      commentMap.set(comment.id, formattedComment);

      if (comment.parent_id) {
        const parentComment = commentMap.get(comment.parent_id);
        if (parentComment) {
          parentComment.replies.push(formattedComment);
        }
      } else {
        structuredComments.push(formattedComment);
      }
    });

    return structuredComments;
  } catch (error) {
    throw new databaseError.DataBaseError('Failed to fetch comments');
  }
};

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
  getVerificationComment,
  postVerificationComment,
};
