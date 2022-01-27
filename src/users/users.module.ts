import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from '../models/users/user.entity';
import { Role } from '../models/roles/user-roles.entity';
import { UsersController } from './users.controller';
import { InvitationModule } from '../invitation/invitation.module';
import { RemindersModule } from '../reminders/reminders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    forwardRef(() => InvitationModule),
    forwardRef(() => RemindersModule),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
