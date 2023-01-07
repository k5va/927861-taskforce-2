import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsDateGreaterThan(
  compareDate = new Date(),
  validationOptions?: ValidationOptions
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsDateGreaterThan',
      target: object.constructor,
      propertyName,
      constraints: [compareDate],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const [compareDate] = args.constraints;
          compareDate.setHours(0, 0, 0, 0);
          const date = new Date(value);
          return date >= compareDate;
        },
      },
    });
  };
}
