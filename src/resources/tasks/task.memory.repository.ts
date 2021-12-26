import Task from './task.model';

let taskRepository: Task[] = [];

/**
 * Returns all Tasks.
 * @returns  Task
 */
const getAll = () => taskRepository;

/**
 * Returns Task by its id
 * @param taskId : string
 * @returns Task
 */
const getOneById = (taskId: string) =>
  taskRepository.find((task: Task) => task.id === taskId);

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
const create = ({ taskData, boardId }: { taskData: Task; boardId: string }) => {
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

/**
 * Update Task with updatedTaskData
 * @param taskId : string
 * @param updatedTaskData : Task
 * @returns Task
 */
const update = ({
  taskId,
  updatedTaskData,
}: {
  taskId: string;
  updatedTaskData: Task;
}) => {
  const prevTask = taskRepository.find((task) => task.id === taskId);
  if (prevTask) {
    const index = taskRepository.indexOf(prevTask);
    const updatedPerson = { ...prevTask, ...updatedTaskData };
    taskRepository[index] = updatedPerson;
    return updatedPerson;
  }
  return prevTask;
};

/**
 * Delete Task by its id
 * @param taskId : string
 * @returns Task[]
 */
const deleteById = (taskId: string) => {
  const task = taskRepository.find((currentTask) => currentTask.id === taskId);
  if (task) {
    const index = taskRepository.indexOf(task);
    return taskRepository.splice(index, 1);
  }
  return null;
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
