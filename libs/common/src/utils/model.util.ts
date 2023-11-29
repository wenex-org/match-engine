import { HttpException, HttpStatus } from '@nestjs/common';

export function expect(condition: boolean, message: string, status: HttpStatus) {
  if (!condition) throw new HttpException(message, status);
}
