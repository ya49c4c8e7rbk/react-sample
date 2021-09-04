import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { CurrentAdminer } from 'src/models/current.adminer';
import { AdminersService } from 'src/resources/adminers/adminers.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local-adminer') {
  constructor(private adminerService: AdminersService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<CurrentAdminer> {
    const adminer = await this.adminerService.validateAdminerCredentials(
      email,
      password,
    );

    if (adminer == null) {
      throw new UnauthorizedException();
    }
    return adminer;
  }
}
