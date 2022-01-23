import {
  FastifyRequest,
  FastifyReply,
  HookHandlerDoneFunction,
  FastifyInstance,
} from 'fastify';
import jwt from 'jsonwebtoken';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function sendUnauthorized(reply: FastifyReply, server: FastifyInstance) {
  reply.status(401).send('Unauthorized');
  server.log.warn('Unauthorized');
}

export function verifyToken(server: FastifyInstance) {
  server.addHook(
    'preHandler',
    (
      req: FastifyRequest,
      reply: FastifyReply,
      done: HookHandlerDoneFunction
    ) => {
      const allowedUrls = ['/login', '/doc', '/', '/favicon.ico'];
      if (!allowedUrls.includes(req.url) && req.url.split('/')[1] !== 'doc') {
        const { authorization } = req.headers;

        if (authorization !== undefined) {
          const [type, token] = authorization.split(' ');

          if (type !== 'Bearer') {
            sendUnauthorized(reply, server);
          } else {
            try {
              jwt.verify(token, JWT_SECRET_KEY as string);
            } catch {
              sendUnauthorized(reply, server);
            }
          }
        } else {
          sendUnauthorized(reply, server);
        }
      }
      done();
    }
  );
}
