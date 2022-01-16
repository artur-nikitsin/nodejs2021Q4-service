import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../users/user.entity';

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
  user: UserEntity;

  @Column()
  boardId: string;

  @Column()
  columnId: string;
}
