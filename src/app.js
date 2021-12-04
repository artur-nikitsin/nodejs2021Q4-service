const fastify = require('fastify')({ logger: true });
const userRouter = require('./resources/users/user.router');
const taskRouter = require('./resources/tasks/task.router');
const boardRouter = require('./resources/boards/board.router');

fastify.register(userRouter);
fastify.register(taskRouter);
fastify.register(boardRouter);

module.exports = fastify;
