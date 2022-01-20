import app from '../app';
import fastifyAuth from 'fastify-auth';

const validation = () => {};
const myPromiseValidation = () => {};

app
  .decorate('asyncVerifyJWTandLevel', async function (request, reply) {
    // your async validation logic
    await validation();
    // throws an error if the authentication fails
  })
  .decorate('asyncVerifyUserAndPassword', function (request, reply) {
    // return a promise that throws an error if the authentication fails
    return myPromiseValidation();
  })
  .register(fastifyAuth)
  .after(() => {
    app.route({
      method: 'POST',
      url: '/login',
      preHandler: app.auth([
        // @ts-ignore
        app.asyncVerifyJWTandLevel,
        // @ts-ignore
        app.asyncVerifyUserAndPassword,
      ]),
      handler: (req, reply) => {
        req.log.info('Auth route');
        reply.send({ hello: 'world' });
      },
    });
  });
