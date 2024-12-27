import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class StringToDatePipe implements PipeTransform {
  constructor(private readonly keys: string[]) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') {
      return value; // Only process body arguments
    }

    for (const key of this.keys) {
      if (value[key]) {
        const date = new Date(value[key]);
        if (isNaN(date.getTime())) {
          throw new BadRequestException(`Invalid date format for key: ${key}`);
        }
        value[key] = date;
      }
    }
    return value;
  }
}
