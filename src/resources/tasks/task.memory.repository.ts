import Task from './task.model';

let taskRepository: Task[] = [];

const getAll = () => taskRepository;

const getOneById = (taskId: string) =>
  taskRepository.find((task: Task) => task.id === taskId);

const getAllByUserId = (taskId: string) =>
  taskRepository.filter((task: Task) => task.userId === taskId);

const getAllByBoardId = (boardId: string) =>
  taskRepository.filter((task: Task) => task.boardId === boardId);

const create = ({ taskData, boardId }: { taskData: Task; boardId: string }) => {
  const { title, order, description, userId, columnId } = taskData;

  const newTask = new Task({
    title,
    order,
    description,
    // @ts-ignore
    userId,
    boardId,
    columnId,
  });
  taskRepository = [...taskRepository, newTask];
  return newTask;
};

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
