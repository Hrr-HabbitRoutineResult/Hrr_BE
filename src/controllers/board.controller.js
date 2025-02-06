import { StatusCodes } from 'http-status-codes';
import boardService from '../services/board.service.js';
import boardDto from '../dtos/board.dto.js';
const getBoardCategories = async (req, res, next) => {
  try {
    const user_email = req.user.email;
    const user_board = await boardService.getBoardCategories(user_email);
    return res.success(user_board, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const createBoard = async (req, res, next) => {
  try {
    const new_board = await boardService.createBoard(boardDto.createBoardResponseDto(req.body));
    return res.success(new_board, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
};

const pinBoard = async (req, res, next) => {
  try {
    const board_id = parseInt(req.params.boardId, 10);
    const board = await boardService.patchBoardPinStatus(board_id, true);
    return res.success(board, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const unpinBoard = async (req, res, next) => {
  try {
    const board_id = parseInt(req.params.boardId, 10);
    const board = await boardService.patchBoardPinStatus(board_id, false);
    return res.success(board, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const getBoardHotPosts = () => {};

export default {
  getBoardCategories,
  createBoard,
  pinBoard,
  unpinBoard,
  getBoardHotPosts,
};
