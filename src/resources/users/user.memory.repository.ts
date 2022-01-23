import { getRepository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CredentialsType } from '../../auth/login.controller';
import { hashCreate } from '../../auth/utils/hashHandler';
// import taskMemoryRepository from '../tasks/task.memory.repository';
// import { TaskEntity } from '../tasks/task.entity';

/**
 * Returns all Users.
 * @returns  User[]
 */
const getAll = async () => getRepository(UserEntity).findAndCount();

/**
 * Returns User by its id
 * @param userId : string
 * @returns User
 */
const getOneById = async (userId: string) => {
  return await getRepository(UserEntity)
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.tasks', 'task')
    .where({ id: userId })
    .getOne();
};

/**
 * Returns User by its login
 * @param login : string
 * @returns User
 */
const getUserByLogin = async (login: CredentialsType['login']) => {
  return await getRepository(UserEntity)
    .createQueryBuilder('user')
    .where('user.login = :login', { login })
    .getOne();
};

/**
 * Create User with userData
 * @param userData : User
 * @returns User
 */

const create = async (userData: UserEntity) => {
  const { name, login, password } = userData;
  const hashPassword = await hashCreate(password);
  const user = new UserEntity();
  user.name = name;
  user.login = login;
  user.password = hashPassword;
  return UserEntity.toResponse(await getRepository(UserEntity).save(user));
};

/**
 * Update User with updatedUserData
 * @param userId : string
 * @param updatedUserData : User
 * @returns User
 */
const update = async ({
  userId,
  updatedUserData,
}: {
  userId: string;
  updatedUserData: UserEntity;
}) => {
  return await getRepository(UserEntity)
    .createQueryBuilder()
    .update(UserEntity)
    .set({ ...updatedUserData })
    .where('id = :userId', { userId })
    .execute();
};

/**
 * Delete User by its id
 * @param userId : string
 * @returns User[]
 */
const deleteById = async (userId: string) => {
  return await getRepository(UserEntity)
    .createQueryBuilder()
    .delete()
    .where('id = :userId', { userId })
    .execute();
};

export default {
  getAll,
  getOneById,
  create,
  update,
  deleteById,
  getUserByLogin,
};
