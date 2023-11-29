import { isExecutable, toJSON, toggleSide } from '@app/common/utils';
import { Dto, Position } from '@app/common/interfaces';
import { Injectable } from '@nestjs/common';
import { RedisService } from '@app/redis';

@Injectable()
export class PositionsService {
  constructor(readonly redis: RedisService) {}

  async create(data: Dto<Position>) {
    const { pair, side, price } = data;

    if (!price) {
    } else {
      const oSide = toggleSide(side);
      const oPrice = +(await this.redis.zrange(`${pair}:${oSide}`, 0, 1)).pop();

      if (isExecutable(side, price, oPrice)) {
        while (data.volume) {
          const position = toJSON<Position>(await this.redis.rpop(`${pair}:${price}`));
        }
      } else {
        await this.redis.zadd(`${pair}:${side}`, price, price);
        await this.redis.lpush(`${pair}:${price}`, JSON.stringify(data));
      }
    }
  }

  // async findById(id: string, options?: ServiceOptions) {
  //   return this.repository.findById(id, options);
  // }

  // async updateById(id: string, data: Partial<Position>, options?: ServiceOptions) {
  //   return this.repository.updateById(id, data, options);
  // }

  // async deleteById(id: string, options?: ServiceOptions) {
  //   return this.repository.deleteById(id, options);
  // }
}
