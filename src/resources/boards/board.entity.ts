import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ColumnEntity } from '../columns/column.entity';

@Entity()
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  columns: ColumnEntity[];
}
