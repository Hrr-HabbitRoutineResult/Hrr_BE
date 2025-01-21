const getBoardsFromUser = user_board => {
  const board_categories = [];

  for (let board of user_board.userBoards) {
    board.board.pinned = board.pinned;
    board.board.index = board.id;
    board_categories.push(board.board);
  }
  return board_categories;
};

export default {
  getBoardsFromUser,
};
