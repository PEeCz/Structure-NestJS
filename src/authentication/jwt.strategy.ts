import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { IItem } from './authentication.interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private accountService: AccountService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET_KEY}`,
    });
  }

  async validate(payload: any) {
    const user = await this.accountService.findById(payload.id);
    if (!user) this.throw();
    if (user.active == false) this.throw();
    return user;
  }

  throw() {
    throw new UnauthorizedException();
  }
}
