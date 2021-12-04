const { validate } = require('uuid');
const boardRepository = require('./board.memory.repository');
const taskService = require('../tasks/task.service');

const getAll = ({ reply }) => {
  const boards = boardRepository.getAll();
  reply.code(200);
  reply.send(boards);
};

const getOneById = ({ request, reply }) => {
  if (!validate(request.params.boardId)) {
    reply.code(400);
    reply.send({ message: `This in not uuid: ${request.params.boardId}` });
  }
  const board = boardRepository.getOneById(request.params.boardId);
  if (board) {
    reply.code(200);
    reply.send(board);
  } else {
    reply.code(404);
    reply.send({
      message: `Board with id: ${request.params.boardId} not found`,
    });
  }
};

const create = ({ request, reply }) => {
  const newBoard = boardRepository.create(request.body);
  if (newBoard) {
    reply.code(201);
    reply.send(newBoard);
  }
};

const updateBoard = ({ request, reply }) => {
  if (!validate(request.params.boardId)) {
    reply.code(400);
    reply.send({ message: `This in not uuid: ${request.params.boardId}` });
  }
  const updatedBoard = boardRepository.update({
    boardId: request.params.boardId,
    updatedBoardData: request.body,
  });
  if (updatedBoard) {
    reply.code(200);
    reply.send(updatedBoard);
  } else {
    reply.code(404);
    reply.send({
      message: `Board with id: ${request.params.boardId} not found`,
    });
  }
};

const deleteBoard = ({ request, reply }) => {
  if (!validate(request.params.boardId)) {
    reply.code(400);
    reply.send({ message: `This in not uuid: ${request.params.boardId}` });
  }
  const deletedBoard = boardRepository.deleteById(request.params.boardId);
  if (deletedBoard && deletedBoard.length >= 1) {
    const boardTasks = taskService.getAllByBoardId(request.params.boardId);
    taskService.deleteBoardsTasks(boardTasks);
    reply.code(204);
  } else {
    reply.code(404);
    reply.send({
      message: `Board with id: ${request.params.boardId} not found`,
    });
  }
};

module.exports = { getAll, create, getOneById, updateBoard, deleteBoard };
