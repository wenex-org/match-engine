import { ConsumerProvider, consumerModuleOptions } from '@app/common/providers';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { Order, OrderSchema } from './schema';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    ClientsModule.register(consumerModuleOptions),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, ConsumerProvider],
})
export class OrdersModule {}
