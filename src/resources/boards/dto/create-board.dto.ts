import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import Column from '../../../models/column.model';
import Task from '../../../models/task.model';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsArray()
  columns: Column[];

  @IsString()
  @IsArray()
  tasks: Task[];
}
