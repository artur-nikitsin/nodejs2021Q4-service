import usersRepository from './user.memory.repository';
import User from './user.model';

/**
 * Returns all Users.
 * @returns  User[]
 */
const getAll = async () => {
  return await usersRepository.getAll();
};

/**
 * Returns User by its id
 * @param userId : string
 * @returns User
 */
const getOneById = async (userId: string) => {
  return await usersRepository.getOneById(userId);
};

/**
 * Create User with userData
 * @param body : User
 * @returns User
 */
const create = async (body: User) => {
  return await usersRepository.create(body);
};

/**
 * Update User with updatedUserData
 * @param userId : string
 * @param body : User
 * @returns User
 */
const updateUser = async (userId: string, body: User) => {
  return await usersRepository.update({
    userId,
    updatedUserData: body,
  });
};

/**
 * Delete User by its id
 * @param userId : string
 * @returns User[]
 */
const deleteUser = async (userId: string) => {
  return await usersRepository.deleteById(userId);
};

export default { getAll, create, getOneById, updateUser, deleteUser };
