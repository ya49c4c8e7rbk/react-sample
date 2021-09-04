import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { UpdateReqModel } from '../models/update.req.model';
import { IsEmailUniqueUser } from '../../../validators/index';

export class UpdateDTO implements UpdateReqModel {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsEmailUniqueUser()
  email: string;
}
