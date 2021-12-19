import Board from './board.model';
import boardRepository from './board.memory.repository';

/**
 * Returns all Boards.
 * @returns  Board[]
 */
const getAll = () => {
  return boardRepository.getAll();
};

/**
 * Returns Board by its id
 * @param boardId : string
 * @returns Board
 */
const getOneById = (boardId: string) => {
  return boardRepository.getOneById(boardId);
};

/**
 * Create Board with boardData
 * @param body : Board
 * @returns Board
 */
const create = (body: Board) => {
  return boardRepository.create(body);
};

/**
 * Update Board with updatedBoardData
 * @param boardId : string
 * @param updatedBoardData : Board
 * @returns Board
 */
const updateBoard = (boardId: string, updatedBoardData: Board) => {
  return boardRepository.update({
    boardId: boardId,
    updatedBoardData: updatedBoardData,
  });
};

/**
 * Delete Board by its id
 * @param boardId : string
 * @returns Board[]
 */
const deleteBoard = (boardId: string) => {
  return boardRepository.deleteById(boardId);
};

export default { getAll, create, getOneById, updateBoard, deleteBoard };
