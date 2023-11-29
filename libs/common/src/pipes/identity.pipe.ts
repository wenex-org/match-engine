import { BadRequestException, Injectable } from '@nestjs/common';
import type { PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseIdPipe implements PipeTransform {
  transform(value: any): string {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid ObjectId');
    }

    return value;
  }
}
