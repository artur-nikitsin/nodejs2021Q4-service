const taskService = require('./task.service');

const taskRouter = (fastify, opts, done) => {
  fastify.get('/boards/:boardId/tasks', async (request, reply) =>
    taskService.getAll({ request, reply })
  );
  fastify.get('/boards/:boardId/tasks/:taskId', async (request, reply) =>
    taskService.getOneById({ request, reply })
  );
  fastify.post('/boards/:boardId/tasks', async (request, reply) =>
    taskService.create({ request, reply })
  );
  fastify.put('/boards/:boardId/tasks/:taskId', async (request, reply) =>
    taskService.updateTask({ request, reply })
  );
  fastify.delete('/boards/:boardId/tasks/:taskId', async (request, reply) =>
    taskService.deleteTask({ request, reply })
  );
  done();
};

module.exports = taskRouter;
