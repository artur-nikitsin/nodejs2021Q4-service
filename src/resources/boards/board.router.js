const boardService = require('./board.service');

const boardRouter = (fastify, opts, done) => {
  fastify.get('/boards', async (request, reply) =>
    boardService.getAll({ request, reply })
  );
  fastify.get('/boards/:boardId', async (request, reply) =>
    boardService.getOneById({ request, reply })
  );
  fastify.post('/boards', async (request, reply) =>
    boardService.create({ request, reply })
  );
  fastify.put('/boards/:boardId', async (request, reply) =>
    boardService.updateBoard({ request, reply })
  );
  fastify.delete('/boards/:boardId', async (request, reply) =>
    boardService.deleteBoard({ request, reply })
  );
  done();
};

module.exports = boardRouter;
