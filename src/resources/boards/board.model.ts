// @ts-ignore
import { v4 } from 'uuid';

interface BoardInterface {
  id: string;
  title: string;
  columns: string[];
}
class Board implements BoardInterface {
  public id: string;
  public title: string;
  public columns: string[];
  constructor({ title = 'title', columns = [] } = {}) {
    this.id = v4();
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
