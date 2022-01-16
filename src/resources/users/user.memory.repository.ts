import { getRepository } from 'typeorm';
import { User } from './user.entity';
// import taskService from '../tasks/task.service';
// import Task from '../tasks/task.model';

// const usersRepository: Array<User> = [];

/**
 * Returns all Users.
 * @returns  User[]
 */
const getAll = async () => getRepository(User).findAndCount();

/**
 * Returns User by its id
 * @param userId : string
 * @returns User
 */
const getOneById = (userId: string) => getRepository(User).findOne(userId);

/**
 * Create User with userData
 * @param userData : User
 * @returns User
 */

const create = async (userData: User) => {
  const { name, login, password } = userData;
  const user = new User();
  user.name = name;
  user.login = login;
  user.password = password;
  return await getRepository(User).save(user);
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
  updatedUserData: User;
}) => {
  return await getRepository(User)
    .createQueryBuilder()
    .update(User)
    .set({ ...updatedUserData })
    .where('id = :userId', { userId })
    .execute();
  // const prevUser = usersRepository.find((user) => user.id === userId);
  // if (prevUser) {
  //   const index = usersRepository.indexOf(prevUser);
  //   const updatedPerson = { ...prevUser, ...updatedUserData };
  //   usersRepository[index] = updatedPerson;
  //   return updatedPerson;
  // }
  // return prevUser;
};

/**
 * Delete User by its id
 * @param userId : string
 * @returns User[]
 */
const deleteById = async (userId: string) => {
  return await getRepository(User)
    .createQueryBuilder()
    .delete()
    .where('id = :userId', { userId })
    .execute();
  // const user = usersRepository.find((currentUser) => currentUser.id === userId);
  // if (user) {
  //   const index = usersRepository.indexOf(user);
  //
  //   const usersTasks: Task[] = taskService.getAllByUserId(user.id);
  //
  //   taskService.reassignUserTasks(usersTasks);
  //
  //   return usersRepository.splice(index, 1);
  // }
  // return null;
};

export default {
  getAll,
  getOneById,
  create,
  update,
  deleteById,
};
