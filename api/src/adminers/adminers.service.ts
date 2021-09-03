import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistReqModel } from './models/regist.req.model';
import { RegistRespModel } from './models/regist.resp.model';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Adminer } from '../entities/adminer.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CurrentAdminer } from 'src/models/current.adminer';
import * as randomToken from 'rand-token';
import * as moment from 'moment';

@Injectable()
export class AdminersService {
  constructor(
    @InjectRepository(Adminer) private adminer: Repository<Adminer>,
    private jwtService: JwtService,
  ) { }
  
  public async getAdminerByEmail(
    email: string,
  ): Promise<Adminer | null> {
    return await this.adminer.findOne({ email });
  }

  private async getPasswordHash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  public async registerAdminer(
    regModel: RegistReqModel,
  ): Promise<RegistRespModel> {
    const result = new RegistRespModel();

    const newAdminer = new Adminer();
    newAdminer.name = regModel.name;
    newAdminer.email = regModel.email;
    newAdminer.password = await this.getPasswordHash(regModel.password);

    await this.adminer.insert(newAdminer);
    result.statusCode = 201;
    result.message = 'success';
    return result;
  }

  public async validateAdminerCredentials(
    email: string,
    password: string,
  ): Promise<CurrentAdminer> {
    const adminer = await this.adminer.findOne({ email });

    if (adminer == null) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, adminer.password);
    if (!isValidPassword) {
      return null;
    }

    const currentAdminer = new CurrentAdminer();
    currentAdminer.id = adminer.id;
    currentAdminer.name = adminer.name;
    currentAdminer.email = adminer.email;

    return currentAdminer;
  }

  public async getJwtToken(adminer: CurrentAdminer): Promise<string> {
    const payload = {
      ...adminer,
    };
    return this.jwtService.signAsync(payload);
  }

  public async getRefreshToken(id: number): Promise<string> {
    const adminerDataToUpdate = {
      refreshToken: randomToken.generate(16),
      refreshTokenExp: moment().day(1).format('YYYY/MM/DD'),
    };

    await this.adminer.update(id, adminerDataToUpdate);
    return adminerDataToUpdate.refreshToken;
  }

  public async clearRefreshToken(id: number): Promise<void> {
    const adminerDataToUpdate = {
      refreshToken: null,
      refreshTokenExp: null,
    };

    await this.adminer.update(id, adminerDataToUpdate);
  }

  public async validRefreshToken(
    email: string,
    refreshToken: string,
  ): Promise<CurrentAdminer> {
    const currentDate = moment().day(1).format('YYYY/MM/DD');
    const adminer = await this.adminer.findOne({
      where: {
        email: email,
        refreshToken: refreshToken,
        refreshTokenExp: MoreThanOrEqual(currentDate),
      },
    });

    if (!adminer) {
      return null;
    }

    const currentAdminer = new CurrentAdminer();
    currentAdminer.id = adminer.id;
    currentAdminer.name = adminer.name;
    currentAdminer.email = adminer.email;

    return currentAdminer;
  }
}
