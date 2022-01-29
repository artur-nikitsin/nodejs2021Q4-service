import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import Column from '../../resources/columns/column.model';
import Task from '../../resources/tasks/task.model';

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
