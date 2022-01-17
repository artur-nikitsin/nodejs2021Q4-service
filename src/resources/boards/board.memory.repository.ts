import Board from './board.model';
import { getRepository } from 'typeorm';
import { BoardEntity } from './board.entity';
import columnRepositiry from '../columns/column. repositiry';
import { ColumnEntity } from '../columns/column.entity';

// let boardRepository: Board[] = [];

/**
 * Returns all Boards.
 * @returns  Board[]
 */
const getAll = async () =>
  await getRepository(BoardEntity).find({
    relations: ['columns'],
  });

/**
 * Returns Board by its id
 * @param boardId : string
 * @returns Board
 */
const getOneById = async (boardId: string) =>
  await getRepository(BoardEntity).findOne({
    where: { id: boardId },
    relations: ['columns'],
  });

/**
 * Create Board with boardData
 * @param boardData : Board
 * @returns Board
 */
const create = async (boardData: Board) => {
  const { title, columns } = boardData;
  const newBoard = new BoardEntity();
  newBoard.title = title;
  if (columns && columns.length > 0) {
    newBoard.columns = await Promise.all(
      columns.map(async (column) => {
        return await columnRepositiry.createColumn(column);
      })
    );
  }
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
  const { title, columns } = updatedBoardData;
  const prevBoard = await getRepository(BoardEntity).findOne({
    where: { id: boardId },
    relations: ['columns'],
  });
  let updatedColumns: ColumnEntity[] = [];
  if (columns && columns.length > 0) {
    updatedColumns = await Promise.all(
      columns.map(async (column) => {
        const prevColumn = await columnRepositiry.getOneById(column.id);
        if (prevColumn) {
          return await columnRepositiry.updateColumn({
            ...prevColumn,
            ...column,
          });
        }
        return await columnRepositiry.createColumn(column);
      })
    );
  }

  return await getRepository(BoardEntity).save({
    ...prevBoard,
    title,
    columns: updatedColumns,
  });
};

/**
 * Delete Board by its id
 * @param boardId : string
 * @returns Board[]
 */
const deleteById = async (boardId: string) => {
  return await getRepository(BoardEntity).delete(boardId);
};

export default {
  getAll,
  getOneById,
  create,
  update,
  deleteById,
};
