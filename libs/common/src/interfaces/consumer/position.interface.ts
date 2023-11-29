import { OrderPair, OrderSide } from '@app/common/enums/producer';

export interface Position {
  id: string;

  price?: number;
  volume: number;

  side: OrderSide;
  pair: OrderPair;

  version: string;

  guid: string;
}
