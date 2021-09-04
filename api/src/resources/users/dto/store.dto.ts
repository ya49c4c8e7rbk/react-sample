import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { StoreReqModel } from '../models/store.req.model';
import { IsEmailUniqueUser, IsMatchConfirm } from '../../../validators/index';

export class StoreDTO implements StoreReqModel {
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
