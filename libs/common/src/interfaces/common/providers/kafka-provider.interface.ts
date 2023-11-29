import { ClientKafka } from '@nestjs/microservices';
import { OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';

import { KafkaObject } from '../kafka.interface';

export interface KafkaProvider<T> extends OnModuleInit {
  readonly channel: string;
  readonly client: ClientKafka;

  set(data: KafkaObject<Partial<T>>): Observable<KafkaObject<T>>;
  get(data: KafkaObject<{ id: string }>): Observable<KafkaObject<T>>;
}
