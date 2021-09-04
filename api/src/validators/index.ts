import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { IsEmailUniqueUserRule } from 'src/validators/customs/IsEmailUniqueUserRule';
import { IsEmailUniqueAdminerRule } from 'src/validators/customs/IsEmailUniqueAdminerRule';

export const IsEmailUniqueUser = (
  property?: any,
  validationOptions?: ValidationOptions,
) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'IsEmailUniqueUser',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: IsEmailUniqueUserRule,
    });
  };
};

export const IsEmailUniqueAdminer = (
  property?: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'IsEmailUniqueAdminer',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: IsEmailUniqueAdminerRule,
    });
  };
};

export const IsMatchConfirm = (
  property: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'isMatchConfirm',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value === args.object[args.constraints[0]];
        },
      },
    });
  };
};
