import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { RegistReqModel } from './models/regist.req.model';
import { IsEmailUniqueUser, IsMatchConfirm } from '../validators/index';

export class RegistUserDTO implements RegistReqModel {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsEmailUniqueUser()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsMatchConfirm('password', {
    message: 'Confirm password not matching',
  })
  confirmPassword: string;
}
