import { getRepository } from 'typeorm';
import { UserEntity } from './user.entity';
import { encryptPassword } from '../../auth.old/utils/cryptUtils';

/**
 * Returns all Users.
 * @returns  User[]
 */
const getAll = async () => getRepository(UserEntity).find();

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
const getUserByLogin = async (login: string) => {
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
  const encryptedPassword = await encryptPassword(password);
  const user = new UserEntity();
  user.name = name;
  user.login = login;
  user.password = encryptedPassword;
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
