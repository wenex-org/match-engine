import { ClientsModuleOptions, Transport } from '@nestjs/microservices';
import { APP, KAFKA_SUBSCRIBE } from '@app/common/consts';
import { KAFKA_CONFIG } from '@app/common/configs';

const { CONSUMER } = APP;

export const consumerModuleOptions: ClientsModuleOptions = [
  {
    name: CONSUMER.PACKAGE.SYMBOL,
    transport: Transport.KAFKA,
    options: {
      subscribe: KAFKA_SUBSCRIBE,
      consumer: { groupId: CONSUMER.CONSUMER.GROUP_ID },
      client: { clientId: CONSUMER.CLIENT.ID, brokers: KAFKA_CONFIG() },
    },
  },
];
