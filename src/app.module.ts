import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { BoardsModule } from './boards/boards.module';
import { ColumnsModule } from './columns/columns.module';

@Module({
  imports: [AuthModule, UsersModule, TasksModule, BoardsModule, ColumnsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
