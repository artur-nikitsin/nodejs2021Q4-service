import {
  FastifyInstance,
  RegisterOptions,
  RequestGenericInterface,
} from 'fastify';
import boardService from './board.service';

import Board from './board.model';
import { validate } from 'uuid';

export interface requestBoardGeneric extends RequestGenericInterface {
  Params: {
    boardId: string;
  };
  Body: Board;
}

/**
 * Board Router.
 * @param  fastify : FastifyInstance
 * @param  opts : RegisterOptions
 * @param  done : (err?: Error | undefined) => void
 */
const boardRouter = (
  fastify: FastifyInstance,
  opts: RegisterOptions,
  done: (err?: Error | undefined) => void
) => {
  /**
   * Returns all Boards.
   * @param path : string
   * @param callback : function
   * @returns  Board[]
   */
  fastify.get('/boards', async (request, reply) => {
    {
      const boards = await boardService.getAll();
      reply.code(200);
      reply.send(boards);
    }
  });
  /**
   * Returns Board by its id
   * @param path : string
   * @param callback : function
   * @returns  Board
   */
  fastify.get<requestBoardGeneric>(
    '/boards/:boardId',
    async (request, reply) => {
      const { boardId } = request.params;
      if (!validate(boardId)) {
        reply.code(400);
        reply.send({ message: `This in not uuid: ${boardId}` });
      }
      const board = await boardService.getOneById(boardId);
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
  /**
   * Create Board with boardData
   * @param path : string
   * @param callback : function
   * @returns  Board
   */
  fastify.post<requestBoardGeneric>('/boards', async (request, reply) => {
    const newBoard = await boardService.create(request.body);
    if (newBoard) {
      reply.code(201);
      reply.send(newBoard);
    }
  });
  /**
   * Update Board with updatedBoard
   * @param path : string
   * @param callback : function
   * @returns  Board
   */
  fastify.put<requestBoardGeneric>(
    '/boards/:boardId',
    async (request, reply) => {
      const { boardId } = request.params;
      if (!validate(boardId)) {
        reply.code(400);
        reply.send({ message: `This in not uuid: ${boardId}` });
      }
      const updatedBoard = await boardService.updateBoard(
        boardId,
        request.body
      );
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
  /**
   * Delete Board by its id
   * @param path : string
   * @param callback : function
   * @returns  Board[]
   */
  fastify.delete<requestBoardGeneric>(
    '/boards/:boardId',
    async (request, reply) => {
      const { boardId } = request.params;
      if (!validate(boardId)) {
        reply.code(400);
        reply.send({ message: `This in not uuid: ${boardId}` });
      }
      const deletedBoard = await boardService.deleteBoard(boardId);
      if (deletedBoard) {
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
