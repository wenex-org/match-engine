/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
require('log-node')();

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_CONFIG, NODE_ENV } from '@app/common/configs';
import { APP, KAFKA_SUBSCRIBE } from '@app/common/consts';
import { NestFactory } from '@nestjs/core';
import { initTracing } from 'tracing';

import { AppModule } from './app.module';

const { CONSUMER } = APP;

async function bootstrap() {
  if (NODE_ENV().IS_PROD) await initTracing(['http', 'kafka']);

  const app = await NestFactory.create(AppModule, { cors: true });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      subscribe: KAFKA_SUBSCRIBE,
      consumer: { groupId: CONSUMER.CONSUMER.GROUP_ID },
      client: { brokers: KAFKA_CONFIG(), clientId: CONSUMER.CLIENT.ID },
    },
  });

  await app.startAllMicroservices();
  await app.listen(CONSUMER.API_PORT);

  const url = await app.getUrl();
  console.log(`Producer Successfully Started On Port ${CONSUMER.API_PORT}`);
  console.log(`Prometheus is running on ${url}/metrics`);
  console.log(`Health check is running on ${url}/status`);
}
bootstrap();
