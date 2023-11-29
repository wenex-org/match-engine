import { MONGO_CONFIG, SENTRY_CONFIG } from '@app/common/configs';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from '@app/health';
import { Module } from '@nestjs/common';

import { OrdersModule } from './modules/orders';

@Module({
  imports: [
    PrometheusModule.register(),
    SentryModule.forRoot(SENTRY_CONFIG()),
    MongooseModule.forRoot(MONGO_CONFIG()),
    HealthModule.forRoot(['disk', 'memory', 'redis', 'mongo', 'kafka']),

    ...[OrdersModule],
  ],
})
export class AppModule {}
