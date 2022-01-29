import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from '../entities/column.entity';
import { ColumnsService } from './columns.service';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([ColumnEntity])],
  providers: [ColumnsService],
  controllers: [],
  exports: [ColumnsService],
})
export class ColumnsModule {}
