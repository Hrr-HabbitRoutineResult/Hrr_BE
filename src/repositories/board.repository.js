import { prisma } from '../db.config.js';
import { Prisma } from '@prisma/client';
import authError from '../errors/auth.error.js';
import boardError from '../errors/board.error.js';
import logger from '../logger.js';

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
    logger.error(error);
    throw error;
  }
};

const patchBoardPinStatus = async (board_id, status) => {
  try {
    const updated_verification = await prisma.userBoard.update({
      where: {
        id: board_id,
      },
      data: {
        pinned: status,
      },
    });
    return updated_verification;
  } catch (error) {
    logger.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        // 레코드가 없을 경우(해당 ID로 업데이트할 레코드를 찾을 수 없을 경우)
        throw new boardError.BoardPinError('레코드를 찾을 수 없습니다.');
      }
    } // 다른 Prisma 관련 에러 처리 (테이블이 없는 경우 등)
    else {
      throw new boardError.DataBaseError('DataBase Error on updating board pin status');
    }
  }
};

const createBoard = async new_board_info => {
  try {
    const created_board = await prisma.board.create({
      data: new_board_info,
    });
    return created_board;
  } catch (error) {
    logger.error(error);
    throw new boardError.DataBaseError('Error on creating board');
  }
};

export default {
  getUserBoard,
  patchBoardPinStatus,
  createBoard,
};
