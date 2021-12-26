import { v4 } from 'uuid';

export interface TaskInterface {
  id: string;
  title: string;
  order: string;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
}

export type TaskConstructorProps = {
  title: string;
  order: string;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
};

class Task implements TaskInterface {
  public id: string;
  public title: string;
  public order: string;
  public description: string;
  public userId: string | null;
  public boardId: string;
  public columnId: string;

  constructor({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  }: TaskConstructorProps) {
    this.id = v4();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export default Task;
