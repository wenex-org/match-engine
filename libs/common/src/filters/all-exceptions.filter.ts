import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { GqlContextType } from '@nestjs/graphql';
import { throwError } from 'rxjs';

import { date, logger, serializeException } from '../utils';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly log = logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const type = host.getType<GqlContextType>();

    this.log
      .get(this.catch.name)
      .error(
        date(`exception type ${type} occurred with error %j`),
        'message' in exception ? exception.message : exception,
      );

    this.log
      .get(this.catch.name)
      .debug(
        date(`exception type ${type} occurred with stack %j`),
        'stack' in exception ? exception.stack : exception,
      );

    switch (type) {
      case 'http': {
        const res = host.switchToHttp().getResponse();

        const status =
          exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        return !!res
          .status(status)
          .json({
            statusCode: status,
            message: exception.message,
            ...('code' in exception ? { error: exception.code } : {}),
          })
          .end();
      }
      case 'rpc': {
        return throwError(() => new RpcException(serializeException(exception)));
      }
      default:
        throw new Error('Unknown exception filter context type');
    }
  }
}
