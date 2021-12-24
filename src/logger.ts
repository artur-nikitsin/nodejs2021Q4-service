import app from './app';

app.setErrorHandler((error, request, reply) => {
  console.log(error);
  reply.status(error.statusCode || 500).send(error.message);
});
