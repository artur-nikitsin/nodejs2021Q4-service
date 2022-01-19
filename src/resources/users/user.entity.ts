import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskEntity } from '../tasks/task.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @OneToMany(() => TaskEntity, (task) => task.userId, { cascade: true })
  @JoinTable()
  tasks: TaskEntity[];

  static toResponse(user: UserEntity) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
