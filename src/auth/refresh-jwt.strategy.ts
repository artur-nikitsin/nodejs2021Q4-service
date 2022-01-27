import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { environment } from '../../environment';
import { UsersService } from '../users/users.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private userService: UsersService) {
    super({
      usernameField: 'email',
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      ignoreExpiration: false,
      secretOrKey: environment.refreshSecretKey,
      passReqToCallback: true,
    });
  }
  async validate(req) {
    const user = await this.userService.getUserWithRolesAndPassword(
      req.body.email,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
