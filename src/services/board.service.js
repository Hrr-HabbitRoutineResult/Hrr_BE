import boardRepository from '../repositories/board.repository.js';
import boardDto from '../dtos/board.dto.js';

const getBoardCategories = async user_email => {
  const user_board = await boardRepository.getUserBoard(user_email);
  const board_categories = boardDto.getBoardsFromUser(user_board);
  const sorted_board_categories = sortBoards(board_categories);
  return sorted_board_categories;
};

const sortBoards = boards => {
  // 조건에 맞는 두 그룹으로 나눔
  const group1 = boards.filter(board => board.pinned === true || board.status === true); // pinned == true || status == true
  const group2 = boards.filter(board => !(board.pinned === true || board.status === true)); // pinned == false && status == false

  // 각 그룹에서 index 값을 기준으로 오름차순으로 정렬
  group1.sort((a, b) => a.index - b.index);
  group2.sort((a, b) => a.index - b.index);

  // 두 그룹을 합쳐서 반환
  return { group1, group2 };
};

const patchBoardPinStatus = async (board_id, status) => {
  const pinned = await boardRepository.patchBoardPinStatus(board_id, status);
  return pinned;
};

export default {
  getBoardCategories,
  patchBoardPinStatus,
};
