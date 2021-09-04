import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Not } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@ValidatorConstraint({ name: 'IsEmailUniqueUserRule', async: true })
@Injectable()
export class IsEmailUniqueUserRule implements ValidatorConstraintInterface {
  constructor(private readonly userService: UsersService) {}

  async validate(value: string, args: ValidationArguments) {
    try {
      const user = await this.userService.findOne({
        id: Not(args.object['__req__'].params.id),
        email: value,
      });
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
