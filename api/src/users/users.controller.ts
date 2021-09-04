import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CurrentUser } from 'src/models/current.user';
import { StoreRespModel } from './models/store.resp.model';
import { LoginRespModel } from './models/login.resp.model';
import { LogoutRespModel } from './models/logout.resp.model';
import { ProfileRespModel } from './models/profile.resp.model';
import { RefreshTokenRespModel } from './models/refresh-token.resp.model';
import { UsersService } from './users.service';
import { StoreDTO } from './dto/store.dto';
import { UpdateDTO } from './dto/update.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('login')
  @UseGuards(AuthGuard('local-user'))
  async login(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginRespModel> {
    try {
      const token = await this.userService.getJwtToken(req.user as CurrentUser);
      const refreshToken = await this.userService.getRefreshToken(req.user.id);
      const secretData = {
        token,
        refreshToken,
      };

      res.cookie('auth-cookie-user', secretData, { httpOnly: true });
      return { statusCode: 201, message: 'success' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt-user'))
  async logout(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LogoutRespModel> {
    res.cookie('auth-cookie-user', '', { httpOnly: true });
    await this.userService.clearRefreshToken(req.user.id);
    return { statusCode: 201, message: 'success' };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt-user'))
  findOne(@Req() req: { user }): ProfileRespModel {
    return { statusCode: 200, message: 'success', data: req.user };
  }

  @Get('refresh-tokens')
  @UseGuards(AuthGuard('refresh-user'))
  async regenerateTokens(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<RefreshTokenRespModel> {
    const token = await this.userService.getJwtToken(req.user as CurrentUser);
    const refreshToken = await this.userService.getRefreshToken(req.user.id);
    const secretData = {
      token,
      refreshToken,
    };

    res.cookie('auth-cookie-user', secretData, { httpOnly: true });
    return { statusCode: 200, message: 'success' };
  }

  //------------------------------------------------------------------------------

  @Get()
  @UseGuards(AuthGuard('jwt-adminer'))
  async index(@Query() query: { name?: string }) {
    try {
      return await this.userService.findAll(query);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt-adminer'))
  async show(@Param() params: { id: string }) {
    try {
      return await this.userService.findOne({ id: params.id });
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt-adminer'))
  async store(@Body() storeDTO: StoreDTO): Promise<StoreRespModel> {
    try {
      return await this.userService.store(storeDTO);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt-adminer'))
  async update(@Param() params: { id: number }, @Body() updateDTO: UpdateDTO) {
    try {
      return await this.userService.update(params.id, updateDTO);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
