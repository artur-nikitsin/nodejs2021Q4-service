import Board from './board.model';

let boardRepository: Board[] = [];

const getAll = () => boardRepository;

const getOneById = (boardId: string) =>
  boardRepository.find((board) => board.id === boardId);

const create = (boardData: Board) => {
  const { title, columns } = boardData;
  const newBoard = new Board({ title, columns });
  boardRepository = [...boardRepository, newBoard];
  return newBoard;
};

const update = ({
  boardId,
  updatedBoardData,
}: {
  boardId: string;
  updatedBoardData: Board;
}) => {
  const prevBoard = boardRepository.find((board) => board.id === boardId);
  if (prevBoard) {
    const index = boardRepository.indexOf(prevBoard);
    const updatedBoard = { ...prevBoard, ...updatedBoardData };
    boardRepository[index] = updatedBoard;
    return updatedBoard;
  }
  return prevBoard;
};

const deleteById = (boardId: string) => {
  const board = boardRepository.find(
    (currentBoard) => currentBoard.id === boardId
  );
  if (board) {
    const index = boardRepository.indexOf(board);
    return boardRepository.splice(index, 1);
  }
  return null;
};

export default {
  getAll,
  getOneById,
  create,
  update,
  deleteById,
};
