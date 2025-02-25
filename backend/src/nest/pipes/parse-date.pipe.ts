import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: string): Date {
    const parsedDate = new Date(value);

    // Check if the parsed date is valid
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException(`${value} is not a valid date string`);
    }

    return parsedDate;
  }
}
