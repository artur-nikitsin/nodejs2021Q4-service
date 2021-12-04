const Task = require('./task.model');

let taskRepository = [];

const getAll = () => taskRepository;

const getOneById = (taskId) =>
  taskRepository.find((task) => task.id === taskId);

const getAllByUserId = (userId) =>
  taskRepository.filter((task) => task.userId === userId);

const getAllByBoardId = (boardId) =>
  taskRepository.filter((task) => task.boardId === boardId);

const create = ({ taskData, boardId }) => {
  const { title, order, description, userId, columnId } = taskData;
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
  getAllByUserId,
  getAllByBoardId,
  create,
  update,
  deleteById,
};
