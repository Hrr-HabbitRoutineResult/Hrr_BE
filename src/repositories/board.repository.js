import { prisma } from '../db.config.js';
import authError from '../errors/auth.error.js';

const getUserBoard = async user_email => {
  try {
    // 이메일로 사용자 찾기
    const user_board = await prisma.user.findUnique({
      where: { email: user_email },
      include: {
        userBoards: {
          // User와 관련된 UserBoard 정보를 포함
          include: {
            board: true, // UserBoard와 관련된 Board 정보도 포함
          },
        },
      },
    });
    if (!user_board) {
      throw new authError.UserNotExistError('User not found in board categories');
    }
    return user_board;
  } catch (error) {
    throw error;
  }
};

export default {
  getUserBoard,
};
