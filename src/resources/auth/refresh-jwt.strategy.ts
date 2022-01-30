import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { tokenConfig } from './config';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private userService: UsersService) {
    super({
      usernameField: 'login',
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      ignoreExpiration: false,
      secretOrKey: tokenConfig.refreshSecretKey,
      passReqToCallback: true,
    });
  }
  async validate(login: string) {
    const user = await this.userService.getUserByLogin(login);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
