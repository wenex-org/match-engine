import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { SentryInterceptor } from '@ntegral/nestjs-sentry';
import { AllExceptionsFilter } from '@app/common/filters';
import { Session } from '@app/common/decorators';
import { ClientSession } from 'mongoose';
import { Observable, from } from 'rxjs';

import { PositionsService } from './positions.service';
import { CreatePositionDto, UpdatePositionDto } from './dto';
import { MessagePattern } from '@nestjs/microservices';
import { ValidationPipe } from '@app/common/pipes';

@Controller()
@UsePipes(ValidationPipe)
@UseFilters(AllExceptionsFilter)
@UseInterceptors(new SentryInterceptor())
export class PositionsController {
  constructor(readonly service: PositionsService) {}

  @MessagePattern('consumer.position.create')
  create(@Body() data: CreatePositionDto): Observable<any> {
    return from(this.service.create(data, { session }));
  }

  @MessagePattern('consumer.position.findById')
  findById(@Param('id', ParseIdPipe) id: string): Observable<any> {
    return from(this.service.findById(id, { session }));
  }

  @MessagePattern('consumer.position.updateById')
  updateById(
    @Body() data: UpdatePositionDto,
    @Param('id', ParseIdPipe) id: string,
  ): Observable<any> {
    return from(this.service.updateById(id, data, { session }));
  }

  @MessagePattern('consumer.position.deleteById')
  deleteById(@Param('id') id: string): Observable<any> {
    return from(this.service.deleteById(id, { session }));
  }
}
