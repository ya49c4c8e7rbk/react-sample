import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CurrentUser } from 'src/models/current.user';
import { RegistReqModel } from './models/regist.req.model';
import { RegistRespModel } from './models/regist.resp.model';
import { LoginRespModel } from './models/login.resp.model';
import { UsersService } from './users.service';
import { RegistUserDTO } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('regist')
  async registerUser(@Body() registUserDTO: RegistUserDTO): Promise<RegistRespModel> {
    console.log(registUserDTO)
    return await this.userService.registerUser(registUserDTO);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req, @Res({ passthrough: true }) res: Response): Promise<LoginRespModel> {
    try {
      const token = await this.userService.getJwtToken(req.user as CurrentUser);
      const refreshToken = await this.userService.getRefreshToken(
        req.user.id,
      );
      const secretData = {
        token,
        refreshToken,
      };

      res.cookie('auth-cookie', secretData, { httpOnly: true });
      return { statusCode: 201, message: 'success' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    res.cookie('auth-cookie', '', { httpOnly: true });
    await this.userService.clearRefreshToken(
      req.user.id,
    );
    return { msg: 'success' };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: { user }) {
    return req.user;
  }

  @Get('refresh-tokens')
  @UseGuards(AuthGuard('refresh'))
  async regenerateTokens(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.userService.getJwtToken(req.user as CurrentUser);
    const refreshToken = await this.userService.getRefreshToken(
      req.user.id,
    );
    const secretData = {
      token,
      refreshToken,
    };

    res.cookie('auth-cookie', secretData, { httpOnly: true });
    return { msg: 'success' };
  }
}
