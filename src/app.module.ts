import { Module } from '@nestjs/common';
import { AuthModule } from './resources/auth/auth.module';
import { UsersModule } from './resources/users/users.module';
import { TasksModule } from './resources/tasks/tasks.module';
import { BoardsModule } from './resources/boards/boards.module';
import { ColumnsModule } from './resources/columns/columns.module';
import { FilesModule } from './resources/files/files.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TasksModule,
    BoardsModule,
    ColumnsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
