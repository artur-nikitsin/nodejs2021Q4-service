import usersRepository from './user.memory.repository';
import User from './user.model';

const getAll = () => {
  return usersRepository.getAll();
};

const getOneById = (userId: string) => {
  return usersRepository.getOneById(userId);
};

const create = (body: User) => {
  return usersRepository.create(body);
};

const updateUser = (userId: string, body: User) => {
  return usersRepository.update({
    userId,
    updatedUserData: body,
  });
};

const deleteUser = (userId: string) => {
  return usersRepository.deleteById(userId);
};

export default { getAll, create, getOneById, updateUser, deleteUser };
