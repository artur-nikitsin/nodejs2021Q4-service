import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { ColumnEntity } from '../columns/column.entity';
import { TaskEntity } from '../tasks/task.entity';

@Entity()
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => ColumnEntity, (column) => column.boardId, {
    cascade: true,
  })
  columns: ColumnEntity[];

  @OneToMany(() => TaskEntity, (task) => task.boardId, {
    cascade: true,
  })
  tasks: TaskEntity[];
}
