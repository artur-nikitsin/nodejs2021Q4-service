import Task from './task.model';
import taskRepository from './task.memory.repository';

/**
 * Returns all Tasks.
 * @returns  Task[]
 */
const getAll = async () => {
  return await taskRepository.getAll();
};

/**
 * Returns Task by its id
 * @param taskId : string
 * @returns Task
 */
const getOneById = async (taskId: string) => {
  return await taskRepository.getOneById(taskId);
};

/**
 * Returns Task by its userId
 * @param userId : string
 * @returns Task[]
 */
const getAllByUserId = async (userId: string) =>
  await taskRepository.getAllByUserId(userId);
/**
 * Returns Task by its boardId
 * @param boardId : string
 * @returns Task[]
 */
const getAllByBoardId = async (boardId: string) =>
  await taskRepository.getAllByBoardId(boardId);

/**
 * Create Task with taskData and boardId
 * @param taskBody : Task,
 * @param boardId : string
 * @returns Task
 */
const create = async (boardId: string, taskBody: Task) => {
  return await taskRepository.create({
    taskData: taskBody,
    boardId: boardId,
  });
};

/**
 * Update Task with updatedTaskData
 * @param taskId : string
 * @param taskBody : Task
 * @returns Task
 */
const updateTask = async (taskId: string, taskBody: Task) => {
  return await taskRepository.update({
    taskId,
    updatedTaskData: taskBody,
  });
};

/**
 * Delete Task by its id
 * @param taskId : string
 * @returns Task[]
 */
const deleteTask = async (taskId: string) => {
  return await taskRepository.deleteById(taskId);
};

/**
 * Reassign task from User
 * @param usersTasks : Task[]
 */
const reassignUserTasks = async (usersTasks: Task[]) => {
  usersTasks.forEach((task) =>
    taskRepository.update({
      taskId: task.id,
      updatedTaskData: { ...task, userId: null },
    })
  );
};

/**
 * Reassign all Boards Tasks
 * @param boardTasks : Task[]
 */
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
