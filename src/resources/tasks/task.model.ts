const { v4: uuidv4 } = require('uuid');

interface TaskInterface {
  id: string;
  title: string;
  order: string;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
}

class Task implements TaskInterface {
  public id: string;
  public title: string;
  public order: string;
  public description: string;
  public userId: string | null;
  public boardId: string;
  public columnId: string;

  constructor({
    title = 'title',
    order = 'order',
    description = 'descriptopn',
    userId = 'userId',
    boardId = 'boardId',
    columnId = 'columnId',
  } = {}) {
    this.id = uuidv4();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export default Task;
