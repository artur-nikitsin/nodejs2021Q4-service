const Board = require('./board.model');

let boardRepository = [];

const getAll = () => boardRepository;

const getOneById = (boardId) =>
  boardRepository.find((board) => board.id === boardId);

const create = (boardData) => {
  const { title, columns } = boardData;
  const newBoard = new Board({ title, columns });
  boardRepository = [...boardRepository, newBoard];
  return newBoard;
};

const update = ({ boardId, updatedBoardData }) => {
  const prevBoard = boardRepository.find((board) => board.id === boardId);
  if (prevBoard) {
    const index = boardRepository.indexOf(prevBoard);
    const updatedBoard = { ...prevBoard, ...updatedBoardData };
    boardRepository[index] = updatedBoard;
    return updatedBoard;
  }
  return prevBoard;
};

const deleteById = (boardId) => {
  const board = boardRepository.find(
    (currentBoard) => currentBoard.id === boardId
  );
  if (board) {
    const index = boardRepository.indexOf(board);
    return boardRepository.splice(index, 1);
  }
  return null;
};

module.exports = {
  getAll,
  getOneById,
  create,
  update,
  deleteById,
};
