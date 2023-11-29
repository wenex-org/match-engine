import { isHexadecimal, isMongoId, isNumber, isSemVer } from 'class-validator';
import { Dto, Order as OrderInterface } from '@app/common/interfaces';
import { OrderType, OrderSide, OrderPair } from '@app/common/enums';
import { Prop, buildSchema } from '@typegoose/typegoose';
import { GUID_LENGTH } from '@app/common/consts';

export class Order implements Dto<OrderInterface> {
  @Prop({
    type: String,
    index: true,
    required: true,
    validate: (value: string) => isMongoId(value),
  })
  owner: string;

  @Prop({
    type: Number,
    index: false,
    required: false,
    validate: (value: number) => isNumber(value) && value > 0,
  })
  price?: number;

  @Prop({
    type: Number,
    index: false,
    required: true,
    validate: (value: number) => isNumber(value) && value > 0,
  })
  volume: number;

  @Prop({
    type: String,
    enum: OrderType,
    index: true,
    required: true,
  })
  type: OrderType;

  @Prop({
    type: String,
    enum: OrderSide,
    index: true,
    required: true,
  })
  side: OrderSide;

  @Prop({
    type: String,
    enum: OrderPair,
    index: true,
    required: true,
  })
  pair: OrderPair;

  @Prop({
    type: Number,
    index: false,
    required: false,
    validate: (value: number) => isNumber(value) && value > 0,
  })
  stop_limit?: number;

  @Prop({
    type: Number,
    index: false,
    required: false,
    validate: (value: number) => isNumber(value) && value > 0,
  })
  take_profit?: number;

  @Prop({
    type: String,
    index: true,
    required: true, // filled by version plugin
    validate: (value: string) => isSemVer(value),
  })
  version?: string;

  @Prop({
    type: String,
    index: true,
    required: true,
    validate: (value: string) => isHexadecimal(value) && value.length === GUID_LENGTH,
  })
  guid: string;
}
export const OrderSchema = buildSchema(Order);

// --------------------
// Index Definition
// --------------------

OrderSchema.index({ owner: 1, guid: 1 }, { unique: true });
