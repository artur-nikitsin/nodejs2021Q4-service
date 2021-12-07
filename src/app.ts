import fastify, {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRegisterOptions,
  FastifyPluginAsync,
  DoneFuncWithErrOrRes,
} from 'fastify';
import userRouter from './resources/users/user.router';
// const userRouter = require('./resources/users/user.router');
// const taskRouter = require('./resources/tasks/task.router');
// const boardRouter = require('./resources/boards/board.router');

const app: FastifyInstance = fastify({ logger: true });

app.register(userRouter);
// app.register(taskRouter);
// app.register(boardRouter);

export default app;
