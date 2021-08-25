import { IsNotEmpty, IsString, IsEmail, Equals } from 'class-validator';
import { RegistReqModel } from './models/regist.req.model';
import { IsMatchConfirm } from '../validators/index'

export class RegistUserDTO implements RegistReqModel {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
    
  @IsNotEmpty()
  @IsString()
  @IsMatchConfirm('password', {
    message: 'Confirm password not matching'
  })
  confirmPassword: string;
}