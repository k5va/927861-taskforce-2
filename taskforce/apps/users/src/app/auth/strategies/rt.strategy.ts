import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@taskforce/shared-types';
import { Request } from 'express';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'rt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('rt.secret'),
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    {
      email,
      name,
      role,
      sub,
    }: Pick<User, 'email' | 'role' | 'name'> & { sub: string }
  ) {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    return {
      id: sub,
      email,
      name,
      role,
      refreshToken,
    };
  }
}
