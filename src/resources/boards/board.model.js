const { v4: uuidv4 } = require('uuid');

class Board {
  constructor({ title, columns } = {}) {
    this.id = uuidv4();
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
