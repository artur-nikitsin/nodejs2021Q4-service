const { v4: uuidv4 } = require('uuid');

class Task {
  constructor({ title, order, description, userId, boardId, columnId } = {}) {
    this.id = uuidv4();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
