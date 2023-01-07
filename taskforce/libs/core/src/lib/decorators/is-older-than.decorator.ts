import { Logger } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { subtractYearsFromDate } from '../utils/subtract-years-from-date';

export function IsOlderThan(
  years: number,
  validationOptions?: ValidationOptions
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isOlderThan',
      target: object.constructor,
      propertyName,
      constraints: [years],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const [years] = args.constraints;
          const date = new Date(value);
          return date <= subtractYearsFromDate(years);
        },
      },
    });
  };
}
