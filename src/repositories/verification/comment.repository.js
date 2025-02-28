import { prisma } from '../../db.config.js';
import databaseError from '../../errors/database.error.js';
import commentError from '../../errors/verification/comment.error.js';
import logger from '../../logger.js';

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
    logger.error(error);
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
    logger.error(error);
    if (error.code === 'P2025') {
      throw new databaseError.DataBaseNotExistError('해당 인증이 존재하지 않습니다.');
    }
    throw new databaseError.DataBaseError('Database error occurred while creating comment');
  }
};

const updateVerificationComment = async (comment_id, content) => {
  try {
    const updated_comment = await prisma.comment.update({
      where: { id: comment_id },
      data: { content: content },
    });
    return {
      id: updated_comment.id,
      user_id: updated_comment.user_id,
      content: updated_comment.content,
      parent_id: updated_comment.parent_id,
      created_at: updated_comment.created_at,
      updated_at: updated_comment.updated_at,
      anonymous: updated_comment.anonymous,
    };
  } catch (error) {
    logger.error(error);
    throw new databaseError.DataBaseError('Failed to update comment');
  }
};

const getCommentById = async comment_id => {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: comment_id },
      select: {
        id: true,
        user_id: true,
        content: true,
        parent_id: true,
        created_at: true,
        updated_at: true,
        anonymous: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });

    if (!comment) {
      throw new commentError.CommentNotExistsError('Comment not found');
    }

    return {
      id: comment.id,
      user_id: comment.user_id,
      nickname: comment.user.nickname,
      content: comment.content,
      parent_id: comment.parent_id,
      created_at: comment.created_at,
      updated_at: comment.updated_at,
      anonymous: comment.anonymous,
    };
  } catch (error) {
    logger.error(error);
    throw new databaseError.DataBaseError('Failed to fetch comment');
  }
};

export default {
  getVerificationComment,
  postVerificationComment,
  updateVerificationComment,
  getCommentById,
};
