import { FastifyReply, FastifyRequest } from 'fastify';
import { getSignToken } from './login.service';
import app from '../app';

export type CredentialsType = {
  login: string;
  password: string;
};

export const postLogin = async (req: FastifyRequest, reply: FastifyReply) => {
  const { login, password }: CredentialsType = req.body as CredentialsType;
  const token = await getSignToken(login, password);
  if (!token) {
    reply.code(403).send('Forbidden login request');
    app.log.warn('Forbidden login request');
  } else {
    reply.send({ token });
    app.log.info('Sign token');
  }
};
