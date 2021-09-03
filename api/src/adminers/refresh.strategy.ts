import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminersService } from './adminers.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh-adminer') {
  constructor(private adminerService: AdminersService, private readonly configService: ConfigService) {
    super({
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY_ADMINER'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies['auth-cookie-adminer'];
          if (!data) {
            return null;
          }
          return data.token;
        },
      ]),
    });
  }

  async validate(req: Request, payload: any) {
    if (!payload) {
      throw new BadRequestException('invalid jwt token');
    }
    const data = req?.cookies['auth-cookie-adminer'];
    if (!data?.refreshToken) {
      throw new BadRequestException('invalid refresh token');
    }
    const adminer = await this.adminerService.validRefreshToken(
      payload.email,
      data.refreshToken,
    );
    if (!adminer) {
      throw new BadRequestException('token expired');
    }

    return adminer;
  }
}
