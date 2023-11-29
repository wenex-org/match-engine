import { OrderPair, OrderSide, OrderType } from '@app/common/enums/producer';
import { Document } from 'mongoose';

export interface Order {
  id: string;

  owner: string;

  price?: number;
  volume: number;

  type: OrderType;
  side: OrderSide;
  pair: OrderPair;

  stop_limit?: number;
  stop_volume?: number;

  take_profit?: number;
  take_volume?: number;

  version: string;

  guid: string;
}
export type OrderDoc = Order & Document;
