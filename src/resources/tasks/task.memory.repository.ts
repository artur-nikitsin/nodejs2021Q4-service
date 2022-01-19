import Task from './task.model';
import { getRepository } from 'typeorm';
import { TaskEntity } from './task.entity';
import boardMemoryRepository from '../boards/board.memory.repository';
import userMemoryRepository from '../users/user.memory.repository';
import columnRepositiry from '../columns/column. repositiry';

const taskRepository: Task[] = [];

/**
 * Returns all Tasks.
 * @returns  Task
 */
const getAll = async () =>
  await getRepository(TaskEntity).find({
    relations: ['userId', 'columnId', 'boardId'],
  });

/**
 * Returns Task by its id
 * @param taskId : string
 * @returns Task
 */
const getOneById = async (taskId: string) =>
  await getRepository(TaskEntity).findOne({
    where: { id: taskId },
    relations: ['columnId', 'userId', 'boardId'],
  });

/**
 * Returns Task by its userId
 * @param userId : string
 * @returns Task[]
 */
const getAllByUserId = async (userId: string) => {
  return await getRepository(TaskEntity).find({
    where: { userId: userId },
    relations: ['columnId', 'userId', 'boardId'],
  });
};

/**
 * Returns Task by its boardId
 * @param boardId : string
 * @returns Task[]
 */
const getAllByBoardId = async (boardId: string) =>
  await taskRepository.filter((task: Task) => task.boardId === boardId);

/**
 * Create Task with taskData and boardId
 * @param taskData : Task,
 * @param boardId : string
 * @returns Task
 */
const create = async ({
  taskData,
  boardId,
}: {
  taskData: Task;
  boardId: string;
}) => {
  const { title, order, description, userId, columnId } = taskData;

  const newTask = new TaskEntity();
  newTask.title = title;
  newTask.order = order;
  newTask.description = description;
  if (userId) {
    newTask.userId = await userMemoryRepository.getOneById(userId);
  } else {
    newTask.userId = undefined;
  }
  if (columnId) {
    const column = await columnRepositiry.getOneById(columnId);
    if (column) {
      newTask.columnId = column;
    }
  } else {
    newTask.userId = undefined;
  }
  if (boardId) {
    const board = await boardMemoryRepository.getOneById(boardId);
    if (board) {
      newTask.boardId = board;
    }
  } else {
    newTask.boardId = null;
  }

  return await getRepository(TaskEntity).save(newTask);
};

/**
 * Update Task with updatedTaskData
 * @param taskId : string
 * @param updatedTaskData : Task
 * @returns Task
 */
const update = async ({
  taskId,
  boardId,
  updatedTaskData,
}: {
  taskId: string;
  boardId: string;
  updatedTaskData: Task;
}) => {
  const { title, order, description, userId, columnId } = updatedTaskData;
  const prevTask = await getOneById(taskId);
  if (prevTask) {
    prevTask.title = title;
    prevTask.order = order;
    prevTask.description = description;
    if (userId) {
      prevTask.userId = await userMemoryRepository.getOneById(userId);
    } else {
      prevTask.userId = undefined;
    }
    if (columnId) {
      const column = await columnRepositiry.getOneById(columnId);
      if (column) {
        prevTask.columnId = column;
      }
    } else {
      prevTask.userId = undefined;
    }
    if (boardId) {
      const board = await boardMemoryRepository.getOneById(boardId);
      if (board) {
        prevTask.boardId = board;
      }
    } else {
      prevTask.boardId = null;
    }
    return await getRepository(TaskEntity).save(prevTask);
  }
};

/**
 * Delete Task by its id
 * @param taskId : string
 * @returns Task[]
 */
const deleteById = async (taskId: string) => {
  return await getRepository(TaskEntity)
    .createQueryBuilder()
    .delete()
    .where('id = :taskId', { taskId })
    .execute();
};

export default {
  getAll,
  getOneById,
  getAllByUserId,
  getAllByBoardId,
  create,
  update,
  deleteById,
};
