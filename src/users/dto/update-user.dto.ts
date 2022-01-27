import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { ERole } from '../../models/roles/enums/role.enum';

export class UpdateUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsEnum(ERole)
  role: ERole;

  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsString()
  managerId: string;
}
