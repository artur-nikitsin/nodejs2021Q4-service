import {
  FastifyRequest,
  FastifyReply,
  HookHandlerDoneFunction,
  FastifyInstance,
} from 'fastify';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const allowedRoutes = ['/login', '/doc', '/', '/favicon.ico'];

const returnUnauthorized = (reply: FastifyReply, app: FastifyInstance) => {
  reply.status(401).send('Unauthorized');
  app.log.warn('Unauthorized');
};

export const authInterceptor = (app: FastifyInstance) => {
  app.addHook(
    'preHandler',
    (
      req: FastifyRequest,
      reply: FastifyReply,
      done: HookHandlerDoneFunction
    ) => {
      const { url } = req;
      if (!allowedRoutes.includes(url)) {
        const { authorization } = req.headers;
        if (authorization) {
          const [type, token] = authorization.split(' ');
          if (type !== 'Bearer') {
            returnUnauthorized(reply, app);
          } else {
            try {
              jwt.verify(token, JWT_SECRET_KEY as string);
            } catch {
              returnUnauthorized(reply, app);
            }
          }
        } else {
          returnUnauthorized(reply, app);
        }
      }
      done();
    }
  );
};
