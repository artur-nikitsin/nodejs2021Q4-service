import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { environment } from '../../environment';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.getUserWithRolesAndPassword(email);
      if (user === undefined) {
        throw new HttpException(
          'ItemsSearchAndPagination not found',
          HttpStatus.NOT_FOUND,
        );
      }
      if (!user.isActive) {
        return null;
      }
      const comparedPassword = await bcrypt.compareSync(
        password,
        user.password,
      );

      if (comparedPassword) {
        return user;
      }
      return null;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.CONFLICT);
    }
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      roles: user.roles.map((role) => role.role),
    };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(
        { token: 'refresh' },
        { expiresIn: '30d', secret: environment.refreshSecretKey },
      ),
      email: user.email,
      roles: payload.roles,
    };
  }
}
