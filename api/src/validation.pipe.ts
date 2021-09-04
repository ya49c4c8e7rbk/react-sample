import {
  PipeTransform,
  Inject,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable({
  scope: Scope.REQUEST,
})
export class ValidationPipe2 implements PipeTransform<any> {
  constructor(@Inject(REQUEST) public request: any) {}

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    object['__req__'] = this.request;
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
