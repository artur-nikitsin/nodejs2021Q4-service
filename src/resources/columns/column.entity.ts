import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardEntity } from '../boards/board.entity';
import { TaskEntity } from '../tasks/task.entity';

@Entity()
export class ColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => BoardEntity, (board) => board.columns, {
    onDelete: 'CASCADE',
  })
  boardId: BoardEntity;

  @OneToMany(() => TaskEntity, (task) => task.columnId)
  tasks: BoardEntity;
}
