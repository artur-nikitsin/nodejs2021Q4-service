import usersService from './user.service';
import { validate } from 'uuid';
import {
  FastifyInstance,
  FastifyPluginCallback,
  RegisterOptions,
  RequestGenericInterface,
} from 'fastify';
import User from './user.model';

export interface requestGeneric extends RequestGenericInterface {
  Params: {
    userId: string;
  };
  Body: User;
}

const userRouter: FastifyPluginCallback = (
  fastify: FastifyInstance,
  opts: RegisterOptions,
  done: (err?: Error | undefined) => void
) => {
  fastify.get('/users', async (request, reply) => {
    const users = usersService.getAll();
    reply.code(200);
    reply.send(users);
  });

  fastify.get<requestGeneric>('/users/:userId', async (request, reply) => {
    const { userId } = request.params;
    if (!validate(userId)) {
      reply.code(400);
      reply.send({ message: `This in not uuid: ${request.params.userId}` });
    }
    const user = usersService.getOneById(userId);
    if (user) {
      reply.code(200);
      reply.send(user);
    } else {
      reply.code(404);
      reply.send({
        message: `User with id: ${request.params.userId} not found`,
      });
    }
  });

  fastify.post<requestGeneric>('/users', async (request, reply) => {
    const newUser = usersService.create(request.body);
    if (newUser) {
      reply.code(201);
      reply.send(newUser);
    }
  });

  fastify.put<requestGeneric>('/users/:userId', async (request, reply) => {
    const { userId } = request.params;
    if (!validate(userId)) {
      reply.code(400);
      reply.send({ message: `This in not uuid: ${request.params.userId}` });
    }
    const body = request.body;
    const updatedUser = usersService.updateUser(userId, body);
    if (updatedUser) {
      reply.code(200);
      reply.send(updatedUser);
    } else {
      reply.code(404);
      reply.send({
        message: `User with id: ${request.params.userId} not found`,
      });
    }
  });

  fastify.delete<requestGeneric>('/users/:userId', async (request, reply) => {
    const { userId } = request.params;
    if (!validate(userId)) {
      reply.code(400);
      reply.send({ message: `This in not uuid: ${request.params.userId}` });
    }
    const deletedUser = usersService.deleteUser(userId);
    if (deletedUser && deletedUser.length >= 1) {
      reply.code(204);
    } else {
      reply.code(404);
      reply.send({
        message: `User with id: ${request.params.userId} not found`,
      });
    }
  });
  done();
};

export default userRouter;
