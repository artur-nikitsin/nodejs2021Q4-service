import Task from './task.model';
import { getRepository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { TaskEntity } from './task.entity';

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
  await getRepository(TaskEntity).findOne(taskId);

/**
 * Returns Task by its userId
 * @param userId : string
 * @returns Task[]
 */
const getAllByUserId = (userId: string) =>
  taskRepository.filter((task: Task) => task.userId === userId);

/**
 * Returns Task by its boardId
 * @param boardId : string
 * @returns Task[]
 */
const getAllByBoardId = (boardId: string) =>
  taskRepository.filter((task: Task) => task.boardId === boardId);

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
  newTask.columnId = columnId;
  if (userId) {
    newTask.user = await getRepository(UserEntity).findOne(userId);
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
  return await getRepository(TaskEntity)
    .createQueryBuilder()
    .update(TaskEntity)
    .set({ ...updatedTaskData })
    .where('id = :taskId', { taskId })
    .execute();
  // const prevTask = taskRepository.find((task) => task.id === taskId);
  // if (prevTask) {
  //   const index = taskRepository.indexOf(prevTask);
  //   const updatedPerson = { ...prevTask, ...updatedTaskData };
  //   taskRepository[index] = updatedPerson;
  //   return updatedPerson;
  // }
  // return prevTask;
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
  // const task = taskRepository.find((currentTask) => currentTask.id === taskId);
  // if (task) {
  //   const index = taskRepository.indexOf(task);
  //   return taskRepository.splice(index, 1);
  // }
  // return null;
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
