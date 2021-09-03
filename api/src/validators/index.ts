import { registerDecorator, ValidationOptions, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { IsEmailUniqueUserRule } from 'src/validators/customs/IsEmailUniqueUserRule';
import { IsEmailUniqueAdminerRule } from 'src/validators/customs/IsEmailUniqueAdminerRule';

export function IsEmailUniqueUser(property?: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsEmailUniqueUser',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: IsEmailUniqueUserRule,
    });
  };
}

export function IsEmailUniqueAdminer(property?: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsEmailUniqueAdminer',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: IsEmailUniqueAdminerRule,
    });
  };
}

export function IsMatchConfirm(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isMatchConfirm',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value === args.object[args.constraints[0]]
        },
      },
    });
  };
}