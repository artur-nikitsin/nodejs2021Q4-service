import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ColumnEntity } from '../columns/column.entity';
import { TaskEntity } from '../tasks/task.entity';

@Entity()
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => ColumnEntity, (column) => column.board, {
    cascade: true,
  })
  columns: ColumnEntity[];

  @ManyToOne(() => TaskEntity, (task) => task.board, {
    cascade: true,
  })
  tasks: TaskEntity[];
}
