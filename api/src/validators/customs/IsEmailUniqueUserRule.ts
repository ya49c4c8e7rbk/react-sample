import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { FindOperator, Not } from 'typeorm';
import { UsersService } from 'src/resources/users/users.service';

@ValidatorConstraint({ name: 'IsEmailUniqueUserRule', async: true })
@Injectable()
export class IsEmailUniqueUserRule implements ValidatorConstraintInterface {
  constructor(private readonly userService: UsersService) {}

  async validate(value: string, args: ValidationArguments) {
    try {
      const conditions: {
        id?: FindOperator<number>;
        email: string;
      } = {
        email: value,
      };
      if (args.object['__req__'].params.id) {
        conditions.id = Not(args.object['__req__'].params.id);
      }
      const user = await this.userService.findOne(conditions);
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
