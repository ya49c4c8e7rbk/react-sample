import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class RegistUserDTO {

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
  confirmPassword: string;
}