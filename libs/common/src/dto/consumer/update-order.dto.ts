import { IsNotEmpty, IsOptional, IsPositive, IsSemVer } from 'class-validator';
import { MakeRequired, Optional, Order } from '@app/common/interfaces';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UpdateOrderDto implements MakeRequired<Optional<Order>, 'version'> {
  @Expose()
  @IsPositive()
  @IsOptional()
  price?: number;

  @Expose()
  @IsPositive()
  @IsOptional()
  volume?: number;

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
  @IsNotEmpty()
  version: string;
}
