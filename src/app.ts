import fastify, { FastifyInstance } from 'fastify';
import dotenv from 'dotenv';
import userRouter from './resources/users/user.router';
import taskRouter from './resources/tasks/task.router';
import boardRouter from './resources/boards/board.router';
// import { LoggerConfig } from './loggerConfig';
import pino from 'pino';
import * as http from 'http';
dotenv.config();
const logger = pino({ level: 'error' }, pino.destination('./logs'));
// @ts-ignore
// const loggerLevel: number = +process.env.LOGGER_LEVEL || 2;

// const logger = pino(
//   {
//     prettyPrint: {
//       colorize: true,
//       level: 'info',
//       translateTime: 'yyyy-dd-mm, h:MM:ss TT',
//     },
//   },
//   pino.destination('./logs')
// );

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
