const { validate } = require('uuid');
const taskRepository = require('./task.memory.repository');

const getAll = ({ reply }) => {
  const tasks = taskRepository.getAll();
  reply.code(200);
  reply.send(tasks);
};

const getOneById = ({ request, reply }) => {
  if (!validate(request.params.taskId)) {
    reply.code(400);
    reply.send({ message: `This in not uuid: ${request.params.taskId}` });
  }
  const task = taskRepository.getOneById(request.params.taskId);
  if (task) {
    reply.code(200);
    reply.send(task);
  } else {
    reply.code(404);
    reply.send({ message: `Task with id: ${request.params.taskId} not found` });
  }
};

const getAllByUserId = (userId) => taskRepository.getAllByUserId(userId);
const getAllByBoardId = (boardId) => taskRepository.getAllByBoardId(boardId);

const create = ({ request, reply }) => {
  const newTask = taskRepository.create({
    taskData: request.body,
    boardId: request.params.boardId,
  });
  if (newTask) {
    reply.code(201);
    reply.send(newTask);
  }
};

const updateTask = ({ request, reply }) => {
  if (!validate(request.params.taskId)) {
    reply.code(400);
    reply.send({ message: `This in not uuid: ${request.params.taskId}` });
  }
  const updatedTask = taskRepository.update({
    taskId: request.params.taskId,
    updatedTaskData: request.body,
  });
  if (updatedTask) {
    reply.code(200);
    reply.send(updatedTask);
  } else {
    reply.code(404);
    reply.send({ message: `Task with id: ${request.params.taskId} not found` });
  }
};

const deleteTask = ({ request, reply }) => {
  if (!validate(request.params.taskId)) {
    reply.code(400);
    reply.send({ message: `This in not uuid: ${request.params.taskId}` });
  }
  const deletedTask = taskRepository.deleteById(request.params.taskId);
  if (deletedTask && deletedTask.length >= 1) {
    reply.code(204);
  } else {
    reply.code(404);
    reply.send({ message: `Task with id: ${request.params.taskId} not found` });
  }
};

const reassignUserTasks = (usersTasks) => {
  usersTasks.forEach((task) =>
    taskRepository.update({
      taskId: task.id,
      updatedTaskData: { ...task, userId: null },
    })
  );
};

const deleteBoardsTasks = (boardTasks) => {
  boardTasks.forEach((boardTask) => {
    taskRepository.deleteById(boardTask.id);
  });
};

module.exports = {
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
