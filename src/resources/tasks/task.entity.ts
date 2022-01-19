import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { BoardEntity } from '../boards/board.entity';
import Board from '../boards/board.model';
import { ColumnEntity } from '../columns/column.entity';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  userId: UserEntity | undefined;

  @ManyToOne(() => BoardEntity, (board) => board.tasks)
  @JoinColumn()
  boardId: Board | null;

  @ManyToOne(() => ColumnEntity, (column) => column.tasks)
  @JoinColumn()
  columnId: ColumnEntity | null;
}
