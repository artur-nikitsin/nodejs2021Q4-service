import { v4 } from 'uuid';

export interface TaskInterface {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

export type TaskConstructorProps = {
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
};

class Task implements TaskInterface {
  public id: string;
  public title: string;
  public order: number;
  public description: string;
  public userId: string | null;
  public boardId: string | null;
  public columnId: string | null;

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
