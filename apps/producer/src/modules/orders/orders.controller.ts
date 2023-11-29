import {
  Body,
  ClassSerializerInterceptor,
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
import { ParseIdPipe, ValidationPipe } from '@app/common/pipes';
import { SentryInterceptor } from '@ntegral/nestjs-sentry';
import { AllExceptionsFilter } from '@app/common/filters';
import { OrderSerializer } from '@app/common/serializers';
import { Session } from '@app/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { ClientSession } from 'mongoose';
import { Observable, from } from 'rxjs';

import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';

@ApiTags('orders')
@Controller('orders')
@UsePipes(ValidationPipe)
@UseFilters(AllExceptionsFilter)
@UseInterceptors(ClassSerializerInterceptor, new SentryInterceptor())
export class OrdersController {
  constructor(readonly service: OrdersService) {}

  @Post()
  create(
    @Body() data: CreateOrderDto,
    @Session('required') session: ClientSession,
  ): Observable<OrderSerializer> {
    return from(this.service.create(data, { session }));
  }

  @Get(':id')
  findById(
    @Param('id', ParseIdPipe) id: string,
    @Session('required') session: ClientSession,
  ): Observable<OrderSerializer> {
    return from(this.service.findById(id, { session }));
  }

  @Patch(':id')
  updateById(
    @Body() data: UpdateOrderDto,
    @Param('id', ParseIdPipe) id: string,
    @Session('required') session: ClientSession,
  ): Observable<OrderSerializer> {
    return from(this.service.updateById(id, data, { session }));
  }

  @Delete(':id')
  deleteById(
    @Param('id', ParseIdPipe) id: string,
    @Session('required') session: ClientSession,
  ): Observable<OrderSerializer> {
    return from(this.service.deleteById(id, { session }));
  }
}
