import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import Board from '../boards/board.model';
import { BoardEntity } from '../boards/board.entity';
import { ColumnEntity } from '../columns/column.entity';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: string;

  @Column()
  description: string;

  @OneToOne(() => UserEntity)
  userId: UserEntity | undefined;

  @ManyToOne(() => BoardEntity, (board) => board.tasks)
  boardId: Board;

  @ManyToOne(() => ColumnEntity, (column) => column.tasks)
  columnId: ColumnEntity;
}
