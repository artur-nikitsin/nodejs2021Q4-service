import fastify, { FastifyInstance } from 'fastify';
import userRouter from './resources/users/user.router';
import taskRouter from './resources/tasks/task.router';
import boardRouter from './resources/boards/board.router';

const app: FastifyInstance = fastify({ logger: true });

app.register(userRouter);
app.register(taskRouter);
app.register(boardRouter);

export default app;
