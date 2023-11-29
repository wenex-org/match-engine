import { OrderType, OrderSide, OrderPair } from '@app/common/enums';
import { Order, Serializer } from '@app/common/interfaces';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class OrderSerializer implements Serializer<Order> {
  @Expose()
  id: string;

  @Expose()
  price?: number;

  @Expose()
  stop_limit?: number;

  @Expose()
  take_profit?: number;

  @Expose()
  owner: string;

  @Expose()
  volume: number;

  @Expose()
  type: OrderType;

  @Expose()
  side: OrderSide;

  @Expose()
  pair: OrderPair;

  @Expose()
  version: string;

  @Expose()
  guid: string;
}
