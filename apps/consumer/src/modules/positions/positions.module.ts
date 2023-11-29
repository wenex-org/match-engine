import { consumerModuleOptions } from '@app/common/providers';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { Position, PositionSchema } from './schema';
import { PositionsService } from './positions.service';
import { PositionsRepository } from './positions.repository';
import { PositionsController } from './positions.controller';

@Module({
  imports: [
    ClientsModule.register(consumerModuleOptions),
    MongooseModule.forFeature([{ name: Position.name, schema: PositionSchema }]),
  ],
  controllers: [PositionsController],
  providers: [PositionsService, PositionsRepository],
})
export class PositionsModule {}
