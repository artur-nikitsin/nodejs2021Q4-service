import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsArray()
  columns: string[];

  @IsString()
  @IsArray()
  tasks: string[];
}
