import Task from './task.model';
import { getRepository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { TaskEntity } from './task.entity';
import columnRepositiry from '../columns/column. repositiry';

const taskRepository: Task[] = [];

/**
 * Returns all Tasks.
 * @returns  Task
 */
const getAll = async () => await getRepository(TaskEntity).findAndCount();

/**
 * Returns Task by its id
 * @param taskId : string
 * @returns Task
 */
const getOneById = async (taskId: string) =>
  await getRepository(TaskEntity).findOne({
    where: { id: taskId },
    relations: ['columnId', 'userId'],
  });

/**
 * Returns Task by its userId
 * @param userId : string
 * @returns Task[]
 */
const getAllByUserId = async (userId: string) =>
  await taskRepository.filter((task: Task) => task.userId === userId);

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

  const column = await columnRepositiry.getOneById(columnId);
  if (!column) {
    throw Error(`Column with id: ${columnId} not found`);
  }
  newTask.columnId = column;
  if (userId) {
    newTask.userId = await getRepository(UserEntity).findOne(userId);
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
  updatedTaskData,
}: {
  taskId: string;
  updatedTaskData: Task;
}) => {
  const { userId } = updatedTaskData;
  const prevTask = await getOneById(taskId);

  let user = undefined;
  if (userId) {
    user = await getRepository(UserEntity).findOne(userId);
  }

  const updatedTask = { ...prevTask, userId: user };

  return await getRepository(TaskEntity).save(updatedTask);
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
