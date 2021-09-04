import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { UsersModule } from './users/users.module';
import { Adminer } from './entities/adminer.entity';
import { AdminersModule } from './adminers/adminers.module';
import { IsEmailUniqueUserRule } from './validators/customs/IsEmailUniqueUserRule';
import { IsEmailUniqueAdminerRule } from './validators/customs/IsEmailUniqueAdminerRule';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe2 } from './validation.pipe';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'root',
      password: 'pass',
      database: 'react_sample',
      entities: [User, Adminer],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AdminersModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe2,
    },
    IsEmailUniqueUserRule,
    IsEmailUniqueAdminerRule,
  ],
})
export class AppModule {}
