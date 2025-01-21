import { create } from 'domain';

const getBoardsFromUser = user_board => {
  const board_categories = [];

  for (let board of user_board.userBoards) {
    board.board.pinned = board.pinned;
    board.board.index = board.id;
    board_categories.push(board.board);
  }
  return board_categories;
};

const createBoardResponseDto = body => {
  const new_board_info = {
    name: body.name,
    description: body.description,
    category: body.category,
  };
  return new_board_info;
};

export default {
  getBoardsFromUser,
  createBoardResponseDto,
};
