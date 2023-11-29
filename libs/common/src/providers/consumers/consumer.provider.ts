import { Inject, Injectable } from '@nestjs/common';
import { KafkaProvider } from '@app/common/classes';
import { ClientKafka } from '@nestjs/microservices';
import { APP } from '@app/common/consts';

const { CONSUMER } = APP;

@Injectable()
export class ConsumerProvider extends KafkaProvider<any> {
  constructor(@Inject(CONSUMER.PACKAGE.SYMBOL) readonly client: ClientKafka) {
    super(CONSUMER.PACKAGE.NAME, client);
  }
}
