import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  order: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  userId: string | null;

  @IsOptional()
  @IsString()
  boardId: string | null;

  @IsOptional()
  @IsString()
  columnId: string | null;
}
