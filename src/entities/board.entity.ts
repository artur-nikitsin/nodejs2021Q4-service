import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ColumnEntity } from './column.entity';
import { TaskEntity } from './task.entity';

@Entity()
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => ColumnEntity, (column) => column.boardId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  columns: (ColumnEntity | undefined)[];

  @OneToMany(() => TaskEntity, (task) => task.board, { cascade: true })
  @JoinColumn()
  tasks: TaskEntity[];
}
