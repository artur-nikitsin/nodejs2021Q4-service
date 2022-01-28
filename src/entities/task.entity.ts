import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { BoardEntity } from './board.entity';
import { ColumnEntity } from './column.entity';

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

  @Column({ nullable: true })
  userId: string | null;

  @Column({ nullable: true })
  boardId: string | null;

  @Column({ nullable: true })
  columnId: string | null;

  @ManyToOne(() => UserEntity, (user) => user.tasks, { onDelete: 'SET NULL' })
  @JoinColumn()
  user: UserEntity | undefined;

  @ManyToOne(() => BoardEntity, (board) => board.tasks, { onDelete: 'CASCADE' })
  @JoinColumn()
  board: BoardEntity | null;

  @ManyToOne(() => ColumnEntity, (column) => column.tasks, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  column: ColumnEntity | null;
}
