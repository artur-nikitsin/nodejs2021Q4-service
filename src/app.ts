import fastify, { FastifyInstance } from 'fastify';
import dotenv from 'dotenv';
import userRouter from './resources/users/user.router';
import taskRouter from './resources/tasks/task.router';
import boardRouter from './resources/boards/board.router';
import fastifyTypeorm from 'fastify-typeorm';
import { createConnection } from 'typeorm';
import pino from 'pino';
import * as http from 'http';
import { logger } from './logger/logger';
import { UserEntity } from './resources/users/user.entity';
import { TaskEntity } from './resources/tasks/task.entity';
import { BoardEntity } from './resources/boards/board.entity';
import { ColumnEntity } from './resources/columns/column.entity';

dotenv.config();

const app: FastifyInstance = fastify<
  http.Server,
  http.IncomingMessage,
  http.ServerResponse,
  pino.Logger
>({
  logger,
});

const POSTGRES_PORT: number = process.env.POSTGRES_PORT
  ? +process.env.POSTGRES_PORT
  : 5432;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_DB = process.env.POSTGRES_DB;

export const connection = createConnection({
  type: 'postgres',
  host: 'host.docker.internal',
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [UserEntity, TaskEntity, BoardEntity, ColumnEntity],
  synchronize: true,
});

app.register(userRouter);
app.register(taskRouter);
app.register(boardRouter);
app.register(fastifyTypeorm, {
  connection,
});

app.addHook('preHandler', function (req, reply, done) {
  if (req.body) {
    req.log.info({ body: req.body }, 'Parsed body');
  }
  done();
});

export default app;
