import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import app from '../app';
import { getToken } from './auth.service';

export type CredentialsType = {
  login: string;
  password: string;
};

export function loginRoute(
  server: FastifyInstance,
  _: FastifyPluginOptions,
  done: CallableFunction
) {
  server.post('/login', async (req: FastifyRequest, reply: FastifyReply) => {
    const { login, password }: CredentialsType = req.body as CredentialsType;
    const token = await getToken(login, password);
    if (!token) {
      reply.code(403).send('Forbidden login request');
      app.log.warn('Forbidden login request');
    } else {
      reply.send({ token });
      app.log.info('Sign token');
    }
  });
  done();
}
