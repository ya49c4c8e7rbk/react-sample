import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

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