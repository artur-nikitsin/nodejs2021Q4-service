import fastify, { FastifyInstance } from 'fastify';
import dotenv from 'dotenv';
import userRouter from './resources/users/user.router';
import taskRouter from './resources/tasks/task.router';
import boardRouter from './resources/boards/board.router';
import pino from 'pino';
import * as http from 'http';
import { logger } from './logger';
dotenv.config();

const app: FastifyInstance = fastify<
  http.Server,
  http.IncomingMessage,
  http.ServerResponse,
  pino.Logger
>({
  logger,
});

app.register(userRouter);
app.register(taskRouter);
app.register(boardRouter);

export default app;
