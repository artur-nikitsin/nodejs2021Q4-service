const { v4: uuidv4 } = require('uuid');

class Column {
  constructor({ title, order } = {}) {
    this.id = uuidv4();
    this.name = title;
    this.login = order;
  }
}

module.exports = Column;
