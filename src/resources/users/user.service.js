const { validate } = require('uuid');
const usersRepository = require('./user.memory.repository');

const getAll = ({ reply }) => {
  const users = usersRepository.getAll();
  reply.code(200);
  reply.send(users);
};

const getOneById = ({ request, reply }) => {
  if (!validate(request.params.userId)) {
    reply.code(400);
    reply.send({ message: `This in not uuid: ${request.params.userId}` });
  }
  const user = usersRepository.getOneById(request.params.userId);
  if (user) {
    reply.code(200);
    reply.send(user);
  } else {
    reply.code(404);
    reply.send({ message: `User with id: ${request.params.userId} not found` });
  }
};

const create = ({ request, reply }) => {
  const newUser = usersRepository.create(request.body);
  if (newUser) {
    reply.code(201);
    reply.send(newUser);
  }
};

const updateUser = ({ request, reply }) => {
  if (!validate(request.params.userId)) {
    reply.code(400);
    reply.send({ message: `This in not uuid: ${request.params.userId}` });
  }
  const updatedUser = usersRepository.update({
    userId: request.params.userId,
    updatedUserData: request.body,
  });
  if (updatedUser) {
    reply.code(200);
    reply.send(updatedUser);
  } else {
    reply.code(404);
    reply.send({ message: `User with id: ${request.params.userId} not found` });
  }
};

const deleteUser = ({ request, reply }) => {
  if (!validate(request.params.userId)) {
    reply.code(400);
    reply.send({ message: `This in not uuid: ${request.params.userId}` });
  }
  const deletedUser = usersRepository.deleteById(request.params.userId);
  if (deletedUser && deletedUser.length >= 1) {
    reply.code(204);
  } else {
    reply.code(404);
    reply.send({ message: `User with id: ${request.params.userId} not found` });
  }
};

module.exports = { getAll, create, getOneById, updateUser, deleteUser };
