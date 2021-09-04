import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistReqModel } from './models/regist.req.model';
import { RegistRespModel } from './models/regist.resp.model';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from 'src/models/current.user';
import * as randomToken from 'rand-token';
import * as moment from 'moment';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private user: Repository<User>,
    private jwtService: JwtService,
  ) {}

  public async getUserByEmail(email: string): Promise<User | null> {
    return await this.user.findOne({ email });
  }

  public async registerUser(
    regModel: RegistReqModel,
  ): Promise<RegistRespModel> {
    const result = new RegistRespModel();

    const newUser = new User();
    newUser.name = regModel.name;
    newUser.email = regModel.email;
    newUser.password = regModel.password;

    await this.user.insert(newUser);
    result.statusCode = 201;
    result.message = 'success';
    return result;
  }

  public async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<CurrentUser> {
    const user = await this.user.findOne({ email });

    if (user == null) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return null;
    }

    const currentUser = new CurrentUser();
    currentUser.id = user.id;
    currentUser.name = user.name;
    currentUser.email = user.email;

    return currentUser;
  }

  public async getJwtToken(user: CurrentUser): Promise<string> {
    const payload = {
      ...user,
    };
    return this.jwtService.signAsync(payload);
  }

  public async getRefreshToken(id: number): Promise<string> {
    const userDataToUpdate = {
      refreshToken: randomToken.generate(16),
      refreshTokenExp: moment().day(1).format('YYYY/MM/DD'),
    };

    await this.user.update(id, userDataToUpdate);
    return userDataToUpdate.refreshToken;
  }

  public async clearRefreshToken(id: number): Promise<void> {
    const userDataToUpdate = {
      refreshToken: null,
      refreshTokenExp: null,
    };

    await this.user.update(id, userDataToUpdate);
  }

  public async validRefreshToken(
    email: string,
    refreshToken: string,
  ): Promise<CurrentUser> {
    const currentDate = moment().day(1).format('YYYY/MM/DD');
    const user = await this.user.findOne({
      where: {
        email: email,
        refreshToken: refreshToken,
        refreshTokenExp: MoreThanOrEqual(currentDate),
      },
    });

    if (!user) {
      return null;
    }

    const currentUser = new CurrentUser();
    currentUser.id = user.id;
    currentUser.name = user.name;
    currentUser.email = user.email;

    return currentUser;
  }
}
