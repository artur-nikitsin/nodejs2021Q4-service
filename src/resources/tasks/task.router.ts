import Task from './task.model';
import taskService from './task.service';
import {
  FastifyInstance,
  RegisterOptions,
  RequestGenericInterface,
} from 'fastify';
import { validate } from 'uuid';

export interface requestTaskGeneric extends RequestGenericInterface {
  Params: {
    taskId: string;
    boardId: string;
  };
  Body: Task;
}

/**
 * Task Router.
 * @param  fastify : FastifyInstance
 * @param  opts : RegisterOptions
 * @param  done : (err?: Error | undefined) => void
 */
const taskRouter = (
  fastify: FastifyInstance,
  opts: RegisterOptions,
  done: (err?: Error | undefined) => void
) => {
  /**
   * Returns all Tasks.
   * @param path : string
   * @param callback : function
   * @returns  Task[]
   */
  fastify.get('/boards/:boardId/tasks', async (request, reply) => {
    const tasks = await taskService.getAll();
    reply.code(200);
    reply.send(tasks);
  });
  /**
   * Returns Task by its id
   * @param path : string
   * @param callback : function
   * @returns  Task
   */
  fastify.get<requestTaskGeneric>(
    '/boards/:boardId/tasks/:taskId',
    async (request, reply) => {
      const { taskId } = request.params;
      if (!validate(taskId)) {
        reply.code(400);
        reply.send({ message: `This in not uuid: ${taskId}` });
      }
      const task = await taskService.getOneById(taskId);
      if (task) {
        reply.code(200);
        reply.send(task);
      } else {
        reply.code(404);
        reply.send({
          message: `Task with id: ${request.params.taskId} not found`,
        });
      }
    }
  );
  /**
   * Create TAsk with taskData
   * @param path : string
   * @param callback : function
   * @returns  Task
   */
  fastify.post<requestTaskGeneric>(
    '/boards/:boardId/tasks',
    async (request, reply) => {
      {
        const { boardId } = request.params;
        const newTask = await taskService.create(boardId, request.body);
        if (newTask) {
          reply.code(201);
          reply.send(newTask);
        }
      }
    }
  );
  /**
   * Update Task with updatedTask
   * @param path : string
   * @param callback : function
   * @returns  Task
   */
  fastify.put<requestTaskGeneric>(
    '/boards/:boardId/tasks/:taskId',
    async (request, reply) => {
      const { taskId, boardId } = request.params;
      if (!validate(taskId)) {
        reply.code(400);
        reply.send({ message: `This in not uuid: ${request.params.taskId}` });
      }
      const updatedTask = await taskService.updateTask(
        taskId,
        boardId,
        request.body
      );
      if (updatedTask) {
        reply.code(200);
        reply.send(updatedTask);
      } else {
        reply.code(404);
        reply.send({
          message: `Task with id: ${request.params.taskId} not found`,
        });
      }
    }
  );
  /**
   * Delete TAsk by its id
   * @param path : string
   * @param callback : function
   * @returns  Task[]
   */
  fastify.delete<requestTaskGeneric>(
    '/boards/:boardId/tasks/:taskId',
    async (request, reply) => {
      const { taskId } = request.params;
      if (!validate(taskId)) {
        reply.code(400);
        reply.send({ message: `This in not uuid: ${request.params.taskId}` });
      }
      const deletedTask = await taskService.deleteTask(taskId);
      if (deletedTask) {
        reply.code(204);
      } else {
        reply.code(404);
        reply.send({
          message: `Task with id: ${request.params.taskId} not found`,
        });
      }
    }
  );
  done();
};

export default taskRouter;
