import {
  FastifyInstance,
  RegisterOptions,
  RequestGenericInterface,
} from 'fastify';
import boardService from './board.service';

import Board from './board.model';
import { validate } from 'uuid';
import taskService from '../tasks/task.service';

export interface requestBoardGeneric extends RequestGenericInterface {
  Params: {
    boardId: string;
  };
  Body: Board;
}

const boardRouter = (
  fastify: FastifyInstance,
  opts: RegisterOptions,
  done: (err?: Error | undefined) => void
) => {
  fastify.get('/boards', async (request, reply) => {
    {
      const boards = boardService.getAll();
      reply.code(200);
      reply.send(boards);
    }
  });
  fastify.get<requestBoardGeneric>(
    '/boards/:boardId',
    async (request, reply) => {
      const { boardId } = request.params;
      if (!validate(boardId)) {
        reply.code(400);
        reply.send({ message: `This in not uuid: ${boardId}` });
      }
      const board = boardService.getOneById(boardId);
      if (board) {
        reply.code(200);
        reply.send(board);
      } else {
        reply.code(404);
        reply.send({
          message: `Board with id: ${request.params.boardId} not found`,
        });
      }
    }
  );
  fastify.post<requestBoardGeneric>('/boards', async (request, reply) => {
    const newBoard = boardService.create(request.body);
    if (newBoard) {
      reply.code(201);
      reply.send(newBoard);
    }
  });
  fastify.put<requestBoardGeneric>(
    '/boards/:boardId',
    async (request, reply) => {
      const { boardId } = request.params;
      if (!validate(boardId)) {
        reply.code(400);
        reply.send({ message: `This in not uuid: ${boardId}` });
      }
      const updatedBoard = boardService.updateBoard(boardId, request.body);
      if (updatedBoard) {
        reply.code(200);
        reply.send(updatedBoard);
      } else {
        reply.code(404);
        reply.send({
          message: `Board with id: ${request.params.boardId} not found`,
        });
      }
    }
  );
  fastify.delete<requestBoardGeneric>(
    '/boards/:boardId',
    async (request, reply) => {
      const { boardId } = request.params;
      if (!validate(boardId)) {
        reply.code(400);
        reply.send({ message: `This in not uuid: ${boardId}` });
      }
      const deletedBoard = boardService.deleteBoard(boardId);
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
    }
  );
  done();
};

export default boardRouter;
