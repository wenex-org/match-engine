import { Metadata } from './generic.interface';

export interface KafkaObject<T = any> {
  value?: T;
  key?: string;
  headers?: Metadata;
}
