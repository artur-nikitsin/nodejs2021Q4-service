import Board from './board.model';
import boardRepository from './board.memory.repository';

/**
 * Returns all Boards.
 * @returns  Board[]
 */
const getAll = async () => {
  return await boardRepository.getAll();
};

/**
 * Returns Board by its id
 * @param boardId : string
 * @returns Board
 */
const getOneById = async (boardId: string) => {
  return await boardRepository.getOneById(boardId);
};

/**
 * Create Board with boardData
 * @param body : Board
 * @returns Board
 */
const create = async (body: Board) => {
  return await boardRepository.create(body);
};

/**
 * Update Board with updatedBoardData
 * @param boardId : string
 * @param updatedBoardData : Board
 * @returns Board
 */
const updateBoard = async (boardId: string, updatedBoardData: Board) => {
  return await boardRepository.update({
    boardId: boardId,
    updatedBoardData: updatedBoardData,
  });
};

/**
 * Delete Board by its id
 * @param boardId : string
 * @returns Board[]
 */
const deleteBoard = async (boardId: string) => {
  return await boardRepository.deleteById(boardId);
};

export default { getAll, create, getOneById, updateBoard, deleteBoard };
