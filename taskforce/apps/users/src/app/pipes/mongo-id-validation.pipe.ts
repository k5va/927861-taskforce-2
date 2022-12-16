import { Types } from 'mongoose';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

const BAD_MONGOID_ERROR = 'Bad entity mongoID';
const BAD_PARAM_ERROR = 'This pipe must used only with params!';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error(BAD_PARAM_ERROR);
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(BAD_MONGOID_ERROR);
    }

    return value;
  }
}
