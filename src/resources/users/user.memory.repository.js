const User = require('./user.model');
const taskService = require('../tasks/task.service');

let usersRepository = [];

const getAll = () => usersRepository.map((user) => User.toResponse(user));

const getOneById = (userId) =>
  usersRepository.find((user) => user.id === userId);

const create = (userData) => {
  const { name, login, password } = userData;
  const newUser = new User({ name, login, password });
  usersRepository = [...usersRepository, newUser];
  return User.toResponse(newUser);
};

const update = ({ userId, updatedUserData }) => {
  const prevUser = usersRepository.find((user) => user.id === userId);
  if (prevUser) {
    const index = usersRepository.indexOf(prevUser);
    const updatedPerson = { ...prevUser, ...updatedUserData };
    usersRepository[index] = updatedPerson;
    return updatedPerson;
  }
  return prevUser;
};

const deleteById = (userId) => {
  const user = usersRepository.find((currentUser) => currentUser.id === userId);
  if (user) {
    const index = usersRepository.indexOf(user);

    const usersTasks = taskService.getAllByUserId(user.id);

    taskService.reassignUserTasks(usersTasks);

    return usersRepository.splice(index, 1);
  }
  return null;
};

module.exports = {
  getAll,
  getOneById,
  create,
  update,
  deleteById,
};
