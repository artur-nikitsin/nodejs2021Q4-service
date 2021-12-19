import User from './user.model';
import taskService from '../tasks/task.service';
import Task from '../tasks/task.model';

let usersRepository: Array<User> = [];

/**
 * Returns all Users.
 * @returns  User[]
 */
const getAll = () => usersRepository.map((user) => User.toResponse(user));

/**
 * Returns User by its id
 * @param userId : string
 * @returns User
 */
const getOneById = (userId: string) =>
  usersRepository.find((user) => user.id === userId);

/**
 * Create User with userData
 * @param userData : User
 * @returns User
 */
const create = (userData: User) => {
  const { name, login, password } = userData;
  const newUser = new User({ name, login, password });
  usersRepository = [...usersRepository, newUser];
  return User.toResponse(newUser);
};

/**
 * Update User with updatedUserData
 * @param userId : string
 * @param updatedUserData : User
 * @returns User
 */
const update = ({
  userId,
  updatedUserData,
}: {
  userId: string;
  updatedUserData: User;
}) => {
  const prevUser = usersRepository.find((user) => user.id === userId);
  if (prevUser) {
    const index = usersRepository.indexOf(prevUser);
    const updatedPerson = { ...prevUser, ...updatedUserData };
    usersRepository[index] = updatedPerson;
    return updatedPerson;
  }
  return prevUser;
};

/**
 * Delete User by its id
 * @param userId : string
 * @returns User[]
 */
const deleteById = (userId: string) => {
  const user = usersRepository.find((currentUser) => currentUser.id === userId);
  if (user) {
    const index = usersRepository.indexOf(user);

    const usersTasks: Task[] = taskService.getAllByUserId(user.id);

    taskService.reassignUserTasks(usersTasks);

    return usersRepository.splice(index, 1);
  }
  return null;
};

export default {
  getAll,
  getOneById,
  create,
  update,
  deleteById,
};
