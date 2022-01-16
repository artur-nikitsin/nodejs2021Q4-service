import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { ColumnEntity } from '../columns/column.entity';

@Entity()
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => ColumnEntity, (column) => column.board)
  columns: ColumnEntity[];
}
