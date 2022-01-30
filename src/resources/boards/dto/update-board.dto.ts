import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import Column from '../../../models/column.model';

export class UpdateBoardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsArray()
  columns: Column[];

  @IsString()
  @IsArray()
  tasks: string[];
}
