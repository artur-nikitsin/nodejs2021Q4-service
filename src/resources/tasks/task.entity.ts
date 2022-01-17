import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import Board from '../boards/board.model';
import { BoardEntity } from '../boards/board.entity';

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

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity | undefined;

  @ManyToOne(() => BoardEntity, (board) => board.tasks)
  board: Board;

  @Column()
  columnId: string;
}
