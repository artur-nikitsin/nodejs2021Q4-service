import usersRepository from './user.memory.repository';
import User from './user.model';

/**
 * Returns all Users.
 * @returns  User[]
 */
const getAll = () => {
  return usersRepository.getAll();
};

/**
 * Returns User by its id
 * @param userId : string
 * @returns User
 */
const getOneById = (userId: string) => {
  return usersRepository.getOneById(userId);
};

/**
 * Create User with userData
 * @param body : User
 * @returns User
 */
const create = (body: User) => {
  return usersRepository.create(body);
};

/**
 * Update User with updatedUserData
 * @param userId : string
 * @param body : User
 * @returns User
 */
const updateUser = (userId: string, body: User) => {
  return usersRepository.update({
    userId,
    updatedUserData: body,
  });
};

/**
 * Delete User by its id
 * @param userId : string
 * @returns User[]
 */
const deleteUser = (userId: string) => {
  return usersRepository.deleteById(userId);
};

export default { getAll, create, getOneById, updateUser, deleteUser };
