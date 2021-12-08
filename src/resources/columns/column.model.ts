import { v4 } from 'uuid';

export interface ColumnInterface {
  id: string;
  title: string;
  order: string;
}

export type ColumnConstructorProps = {
  title: string;
  order: string;
};

class Column implements ColumnInterface {
  public id: string;
  public title: string;
  public order: string;
  constructor({ title, order }: ColumnConstructorProps) {
    this.id = v4();
    this.title = title;
    this.order = order;
  }
}

export default Column;
