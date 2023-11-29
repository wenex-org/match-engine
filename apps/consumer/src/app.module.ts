import { MONGO_CONFIG, REDIS_CONFIG, SENTRY_CONFIG } from '@app/common/configs';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from '@app/health';
import { RedisModule } from '@app/redis';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    PrometheusModule.register(),
    RedisModule.forRoot(REDIS_CONFIG()),
    SentryModule.forRoot(SENTRY_CONFIG()),
    MongooseModule.forRoot(MONGO_CONFIG()),
    HealthModule.forRoot(['disk', 'memory', 'redis', 'mongo', 'kafka']),
  ],
})
export class AppModule {}
