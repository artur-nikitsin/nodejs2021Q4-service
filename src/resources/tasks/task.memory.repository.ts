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
    relations: ['column'],
  });

/**
 * Returns Task by its id
 * @param taskId : string
 * @returns Task
 */
const getOneById = async (taskId: string) =>
  await getRepository(TaskEntity).findOne({
    where: { id: taskId },
    relations: ['column'],
  });

/**
 * Returns Task by its userId
 * @param userId : string
 * @returns Task[]
 */
const getAllByUserId = async (userId: string) => {
  return await getRepository(TaskEntity).find({
    where: { userId: userId },
    relations: ['column', 'user', 'board'],
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
  newTask.boardId = boardId;
  newTask.columnId = columnId;
  newTask.userId = userId;
  if (userId) {
    newTask.user = await userMemoryRepository.getOneById(userId);
  } else {
    newTask.user = undefined;
  }
  if (columnId) {
    const column = await columnRepositiry.getOneById(columnId);
    if (column) {
      newTask.column = column;
    }
  } else {
    newTask.column = null;
  }
  if (boardId) {
    const board = await boardMemoryRepository.getOneById(boardId);
    if (board) {
      newTask.board = board;
    }
  } else {
    newTask.boardId = null;
  }

  const { id } = await getRepository(TaskEntity).save(newTask);
  return await getOneById(id);
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
    prevTask.boardId = boardId;
    prevTask.columnId = columnId;
    prevTask.userId = userId;
    if (userId) {
      prevTask.user = await userMemoryRepository.getOneById(userId);
    } else {
      prevTask.user = undefined;
    }
    if (columnId) {
      const column = await columnRepositiry.getOneById(columnId);
      if (column) {
        prevTask.column = column;
      }
    } else {
      prevTask.userId = null;
    }
    if (boardId) {
      const board = await boardMemoryRepository.getOneById(boardId);
      if (board) {
        prevTask.board = board;
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
