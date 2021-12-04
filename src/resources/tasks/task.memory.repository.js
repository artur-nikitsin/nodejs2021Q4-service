const Task = require('./task.model');

let taskRepository = [];

const getAll = () => taskRepository;

const getOneById = (taskId) =>
  taskRepository.find((task) => task.id === taskId);

const create = (taskData) => {
  const { title, order, description, userId, boardId, columnId } = taskData;
  const newTask = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });
  taskRepository = [...taskRepository, newTask];
  return newTask;
};

const update = ({ taskId, updatedTaskData }) => {
  const prevTask = taskRepository.find((task) => task.id === taskId);
  if (prevTask) {
    const index = taskRepository.indexOf(prevTask);
    const updatedPerson = { ...prevTask, ...updatedTaskData };
    taskRepository[index] = updatedPerson;
    return updatedPerson;
  }
  return prevTask;
};

const deleteById = (taskId) => {
  const task = taskRepository.find((currentTask) => currentTask.id === taskId);
  if (task) {
    const index = taskRepository.indexOf(task);
    return taskRepository.splice(index, 1);
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
