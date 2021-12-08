import Task from './task.model';
import taskService from './task.service';
import {
  FastifyInstance,
  FastifyPluginCallback,
  FastifyRequest,
  RegisterOptions,
  RequestGenericInterface,
} from 'fastify';
// @ts-ignore
import { validate } from 'uuid';

export interface requestTaskGeneric extends RequestGenericInterface {
  Params: {
    taskId: string;
    boardId: string;
  };
  Body: Task;
}

const taskRouter = (
  fastify: FastifyInstance,
  opts: RegisterOptions,
  done: (err?: Error | undefined) => void
) => {
  fastify.get('/boards/:boardId/tasks', async (request, reply) => {
    const tasks = taskService.getAll();
    reply.code(200);
    reply.send(tasks);
  });
  fastify.get<requestTaskGeneric>(
    '/boards/:boardId/tasks/:taskId',
    async (request, reply) => {
      const { taskId } = request.params;
      if (!validate(taskId)) {
        reply.code(400);
        reply.send({ message: `This in not uuid: ${taskId}` });
      }
      const task = taskService.getOneById(taskId);
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
  fastify.post<requestTaskGeneric>(
    '/boards/:boardId/tasks',
    async (request, reply) => {
      {
        const { boardId } = request.params;
        const newTask = taskService.create(boardId, request.body);
        if (newTask) {
          reply.code(201);
          reply.send(newTask);
        }
      }
    }
  );
  fastify.put<requestTaskGeneric>(
    '/boards/:boardId/tasks/:taskId',
    async (request, reply) => {
      const { taskId } = request.params;
      if (!validate(taskId)) {
        reply.code(400);
        reply.send({ message: `This in not uuid: ${request.params.taskId}` });
      }
      const updatedTask = taskService.updateTask(taskId, request.body);
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
  fastify.delete<requestTaskGeneric>(
    '/boards/:boardId/tasks/:taskId',
    async (request, reply) => {
      const { taskId } = request.params;
      if (!validate(taskId)) {
        reply.code(400);
        reply.send({ message: `This in not uuid: ${request.params.taskId}` });
      }
      const deletedTask = taskService.deleteTask(taskId);
      if (deletedTask && deletedTask.length >= 1) {
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
