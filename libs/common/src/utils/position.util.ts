import { OrderSide } from '../enums';

export const toggleSide = (side: OrderSide) =>
  side === OrderSide.Buy ? OrderSide.Sell : OrderSide.Buy;

export const isExecutable = (side: OrderSide, maker: number, taker: number) => {
  return side === OrderSide.Buy ? maker >= taker : maker <= taker;
};
