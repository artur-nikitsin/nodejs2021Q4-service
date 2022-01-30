import { v4 } from 'uuid';
import Column from './column.model';

export interface BoardInterface {
  id: string;
}

export type BoardConstructorProps = { title: string; columns: Column[] };

class Board implements BoardInterface {
  public id: string;
  public title: string;
  public columns: Column[];
  constructor({ title, columns }: BoardConstructorProps) {
    this.id = v4();
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
