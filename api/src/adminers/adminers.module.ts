import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { RefreshStrategy } from './refresh.strategy';
import { Adminer } from '../../entities/adminer.entity';
import { AdminersController } from './adminers.controller';
import { AdminersService } from './adminers.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Adminer]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY_ADMINER,
      signOptions: {
        expiresIn: 30,
      },
    }),
    PassportModule,
  ],
  providers: [AdminersService, LocalStrategy, JwtStrategy, RefreshStrategy],
  controllers: [AdminersController],
  exports: [AdminersService],
})
export class AdminersModule {}
