const usersService = require('./user.service');

const userRouter = (fastify, opts, done) => {
  fastify.get('/users', async (request, reply) =>
    usersService.getAll({ request, reply })
  );
  fastify.get('/users/:userId', async (request, reply) =>
    usersService.getOneById({ request, reply })
  );
  fastify.post('/users', async (request, reply) =>
    usersService.create({ request, reply })
  );
  fastify.put('/users/:userId', async (request, reply) =>
    usersService.updateUser({ request, reply })
  );
  fastify.delete('/users/:userId', async (request, reply) =>
    usersService.deleteUser({ request, reply })
  );
  done();
};

module.exports = userRouter;
