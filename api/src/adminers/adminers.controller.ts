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
import { CurrentAdminer } from 'src/models/current.adminer';
import { RegistRespModel } from './models/regist.resp.model';
import { LoginRespModel } from './models/login.resp.model';
import { AdminersService } from './adminers.service';
import { RegistAdminerDTO } from './adminers.dto';

@Controller('adminers')
export class AdminersController {
  constructor(private adminerService: AdminersService) {}

  @Post('regist')
  async registerAdminer(
    @Body() registAdminerDTO: RegistAdminerDTO,
  ): Promise<RegistRespModel> {
    try {
      return await this.adminerService.registerAdminer(registAdminerDTO);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  @Post('login')
  @UseGuards(AuthGuard('local-adminer'))
  async login(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginRespModel> {
    try {
      const token = await this.adminerService.getJwtToken(
        req.user as CurrentAdminer,
      );
      const refreshToken = await this.adminerService.getRefreshToken(
        req.user.id,
      );
      const secretData = {
        token,
        refreshToken,
      };

      res.cookie('auth-cookie-adminer', secretData, { httpOnly: true });
      return { statusCode: 201, message: 'success' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt-adminer'))
  async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    res.cookie('auth-cookie-adminer', '', { httpOnly: true });
    await this.adminerService.clearRefreshToken(req.user.id);
    return { msg: 'success' };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt-adminer'))
  getProfile(@Req() req: { user }) {
    return req.user;
  }

  @Get('refresh-tokens')
  @UseGuards(AuthGuard('refresh-adminer'))
  async regenerateTokens(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.adminerService.getJwtToken(
      req.user as CurrentAdminer,
    );
    const refreshToken = await this.adminerService.getRefreshToken(req.user.id);
    const secretData = {
      token,
      refreshToken,
    };

    res.cookie('auth-cookie-adminer', secretData, { httpOnly: true });
    return { msg: 'success' };
  }
}
