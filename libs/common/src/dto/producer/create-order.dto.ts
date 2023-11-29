import {
  IsEnum,
  IsHexadecimal,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsSemVer,
  Length,
} from 'class-validator';
import { OrderType, OrderSide, OrderPair } from '@app/common/enums';
import { Exclude, Expose } from 'class-transformer';
import { Dto, Order } from '@app/common/interfaces';
import { GUID_LENGTH } from '@app/common/consts';

@Exclude()
export class CreateOrderDto implements Dto<Order> {
  @Expose()
  @IsMongoId()
  @IsNotEmpty()
  owner: string;

  @Expose()
  @IsPositive()
  @IsOptional()
  price?: number;

  @Expose()
  @IsPositive()
  @IsNotEmpty()
  volume: number;

  @Expose()
  @IsNotEmpty()
  @IsEnum(OrderType)
  type: OrderType;

  @Expose()
  @IsNotEmpty()
  @IsEnum(OrderSide)
  side: OrderSide;

  @Expose()
  @IsNotEmpty()
  @IsEnum(OrderPair)
  pair: OrderPair;

  @Expose()
  @IsOptional()
  @IsPositive()
  stop_limit?: number;

  @Expose()
  @IsOptional()
  @IsPositive()
  take_profit?: number;

  @Expose()
  @IsSemVer()
  @IsOptional()
  version?: string;

  @Expose()
  @IsNotEmpty()
  @IsHexadecimal()
  @Length(GUID_LENGTH)
  guid: string;
}
