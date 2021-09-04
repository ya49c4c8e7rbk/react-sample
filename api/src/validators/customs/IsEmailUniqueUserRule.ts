import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@ValidatorConstraint({ name: 'IsEmailUniqueUserRule', async: true })
@Injectable()
export class IsEmailUniqueUserRule implements ValidatorConstraintInterface {
  constructor(private readonly userService: UsersService) {}
  async validate(email: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      if (user != null && user.email) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} already exist`;
  }
}
