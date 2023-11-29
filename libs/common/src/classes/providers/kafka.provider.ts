import {
  KafkaObject,
  ServiceOptions,
  KafkaProvider as KafkaProviderInterface,
} from '@app/common/interfaces';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const kafkaTopic = (channel: string, method: string) => `${channel}.${method}`;

export class KafkaProvider<T> implements KafkaProviderInterface<T> {
  constructor(
    readonly channel: string,
    readonly client: ClientKafka,
  ) {}

  onModuleInit() {
    [kafkaTopic(this.channel, this.set.name)].forEach((topic) =>
      this.client.subscribeToResponseOf(topic),
    );

    this.client.connect();
  }

  get(data: KafkaObject<{ id: string }>): Observable<KafkaObject<T>> {
    throw new Error('Method not implemented.');
  }

  set(data: KafkaObject<Partial<T>>): Observable<KafkaObject<T>> {
    throw new Error('Method not implemented.');
  }
}
