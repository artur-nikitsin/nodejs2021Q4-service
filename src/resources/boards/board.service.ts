import Board from './board.model';
import boardRepository from './board.memory.repository';

const getAll = () => {
  return boardRepository.getAll();
};

const getOneById = (boardId: string) => {
  return boardRepository.getOneById(boardId);
};

const create = (body: Board) => {
  return boardRepository.create(body);
};

const updateBoard = (boardId: string, updatedBoardData: Board) => {
  return boardRepository.update({
    boardId: boardId,
    updatedBoardData: updatedBoardData,
  });
};

const deleteBoard = (boardId: string) => {
  return boardRepository.deleteById(boardId);
};

export default { getAll, create, getOneById, updateBoard, deleteBoard };
