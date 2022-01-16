import Board from './board.model';
import { getRepository } from 'typeorm';
import { BoardEntity } from './board.entity';

// let boardRepository: Board[] = [];

/**
 * Returns all Boards.
 * @returns  Board[]
 */
const getAll = async () => await getRepository(BoardEntity).findAndCount();

/**
 * Returns Board by its id
 * @param boardId : string
 * @returns Board
 */
const getOneById = async (boardId: string) =>
  await getRepository(BoardEntity).findOne(boardId);

/**
 * Create Board with boardData
 * @param boardData : Board
 * @returns Board
 */
const create = async (boardData: Board) => {
  const { title, columns } = boardData;
  const newBoard = new BoardEntity();
  newBoard.title = title;
  // @ts-ignore
  newBoard.columns = columns;
  return await getRepository(BoardEntity).save(newBoard);
};

/**
 * Update Board with updatedBoardData
 * @param boardId : string
 * @param updatedBoardData : Board
 * @returns Board
 */
const update = async ({
  boardId,
  updatedBoardData,
}: {
  boardId: string;
  updatedBoardData: Board;
}) => {
  // const prevBoard = boardRepository.find((board) => board.id === boardId);
  // if (prevBoard) {
  //   const index = boardRepository.indexOf(prevBoard);
  //   const updatedBoard = { ...prevBoard, ...updatedBoardData };
  //   boardRepository[index] = updatedBoard;
  //   return updatedBoard;
  // }
  // return prevBoard;
  return await getRepository(BoardEntity)
    .createQueryBuilder()
    .update(BoardEntity)
    .set({ ...updatedBoardData })
    .where('id = :boardId', { boardId })
    .execute();
};

/**
 * Delete Board by its id
 * @param boardId : string
 * @returns Board[]
 */
const deleteById = async (boardId: string) => {
  return await getRepository(BoardEntity)
    .createQueryBuilder()
    .delete()
    .where('id = :boardId', { boardId })
    .execute();
  // const board = boardRepository.find(
  //   (currentBoard) => currentBoard.id === boardId
  // );
  // if (board) {
  //   const index = boardRepository.indexOf(board);
  //   return boardRepository.splice(index, 1);
  // }
  // return null;
};

export default {
  getAll,
  getOneById,
  create,
  update,
  deleteById,
};
