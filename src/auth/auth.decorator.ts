import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ERole } from '../models/roles/enums/role.enum';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

export function Auth(...roles: ERole[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}
