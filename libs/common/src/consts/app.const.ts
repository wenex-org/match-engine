import { Application } from '../interfaces';

export const APP: Application = {
  PRODUCER: {
    API_PORT: +(process.env.PRODUCER_API_PORT || 9010),
  },
  CONSUMER: {
    PACKAGE: { NAME: 'consumer', SYMBOL: Symbol('CONSUMER') },
    CLIENT: { ID: 'consumer-client' },
    CONSUMER: { GROUP_ID: 'consumer-group' },
    SERVICES: { POSITION: { NAME: 'position' } },
    API_PORT: +(process.env.CONSUMER_API_PORT || 9020),
  },
};
