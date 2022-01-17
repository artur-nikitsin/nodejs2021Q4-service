import { v4 } from 'uuid';

export interface ColumnInterface {
  id: string;
  title: string;
  order: number;
}

export type ColumnConstructorProps = {
  title: string;
  order: number;
};

class Column implements ColumnInterface {
  public id: string;
  public title: string;
  public order: number;
  constructor({ title, order }: ColumnConstructorProps) {
    this.id = v4();
    this.title = title;
    this.order = order;
  }
}

export default Column;
