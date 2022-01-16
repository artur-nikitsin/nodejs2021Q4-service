import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class ColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: string;
}
