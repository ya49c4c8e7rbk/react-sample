import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { RegistReqModel } from './models/regist.req.model';
import { IsEmailUniqueAdminer, IsMatchConfirm } from '../validators/index';

export class RegistAdminerDTO implements RegistReqModel {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsEmailUniqueAdminer()
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
