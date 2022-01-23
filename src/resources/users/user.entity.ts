import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @OneToMany(() => TaskEntity, (task) => task.user, { cascade: true })
  tasks: TaskEntity[];

  static toResponse(user: UserEntity) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
