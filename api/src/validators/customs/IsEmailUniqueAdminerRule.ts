import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { AdminersService } from 'src/adminers/adminers.service';

@ValidatorConstraint({ name: 'IsEmailUniqueAdminerRule', async: true })
@Injectable()
export class IsEmailUniqueAdminerRule implements ValidatorConstraintInterface {
  constructor(private readonly adminerService: AdminersService) {}
  async validate(email: string) {
    try {
      const adminer = await this.adminerService.getAdminerByEmail(email);
      if (adminer != null && adminer.email) {
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
