import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
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
