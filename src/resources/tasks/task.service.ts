import Task from './task.model';

const { validate } = require('uuid');
import taskRepository from './task.memory.repository';

const getAll = () => {
  return taskRepository.getAll();
};

const getOneById = (taskId: string) => {
  return taskRepository.getOneById(taskId);
};

const getAllByUserId = (userId: string) =>
  taskRepository.getAllByUserId(userId);
const getAllByBoardId = (boardId: string) =>
  taskRepository.getAllByBoardId(boardId);

const create = (boardId: string, taskBody: Task) => {
  return taskRepository.create({
    taskData: taskBody,
    boardId: boardId,
  });
};

const updateTask = (taskId: string, taskBody: Task) => {
  return taskRepository.update({
    taskId,
    updatedTaskData: taskBody,
  });
};

const deleteTask = (taskId: string) => {
  return taskRepository.deleteById(taskId);
};

const reassignUserTasks = (usersTasks: Task[]) => {
  usersTasks.forEach((task) =>
    taskRepository.update({
      taskId: task.id,
      updatedTaskData: { ...task, userId: null },
    })
  );
};

const deleteBoardsTasks = (boardTasks: Task[]) => {
  boardTasks.forEach((boardTask) => {
    taskRepository.deleteById(boardTask.id);
  });
};

export default {
  getAll,
  getAllByUserId,
  getAllByBoardId,
  create,
  getOneById,
  updateTask,
  deleteTask,
  reassignUserTasks,
  deleteBoardsTasks,
};
