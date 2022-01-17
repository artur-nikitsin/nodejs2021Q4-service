import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BoardEntity } from '../boards/board.entity';

@Entity()
export class ColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => BoardEntity, (board) => board.columns)
  board: BoardEntity;
}
