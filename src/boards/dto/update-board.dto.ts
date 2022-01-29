import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdateBoardDto {
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
