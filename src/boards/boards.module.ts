import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { BoardEntity } from '../entities/board.entity';
import { TasksModule } from '../tasks/tasks.module';
import { ColumnsModule } from '../columns/columns.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([BoardEntity]),
    TasksModule,
    ColumnsModule,
  ],
  providers: [BoardsService],
  controllers: [BoardsController],
  exports: [BoardsService],
})
export class BoardsModule {}
