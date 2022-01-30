import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcryptjs from 'bcryptjs';
import { tokenConfig } from './config';
import User from '../../models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(login: string, password: string): Promise<User | null> {
    try {
      const user = await this.userService.getUserByLogin(login);
      if (!user) {
        throw new HttpException(
          'ItemsSearchAndPagination not found',
          HttpStatus.NOT_FOUND
        );
      }

      const comparedPassword = bcryptjs.compareSync(password, user.password);

      if (comparedPassword) {
        return user;
      }
      return null;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.CONFLICT);
    }
  }

  async login(login: string, password: string) {
    const payload = {
      login,
      password,
    };
    return {
      token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(
        { token: 'refresh' },
        { expiresIn: '30d', secret: tokenConfig.refreshSecretKey }
      ),
      login: login,
    };
  }
}
