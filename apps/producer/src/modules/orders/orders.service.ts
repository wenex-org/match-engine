import { Dto, Order, ServiceOptions } from '@app/common/interfaces';
import { ConsumerProvider } from '@app/common/providers';
import { Injectable } from '@nestjs/common';

import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    readonly consumer: ConsumerProvider,
    readonly repository: OrdersRepository,
  ) {}

  async create(data: Dto<Order>, options?: ServiceOptions) {
    return this.repository.create(data, options);
  }

  async findById(id: string, options?: ServiceOptions) {
    return this.repository.findById(id, options);
  }

  async updateById(id: string, data: Partial<Order>, options?: ServiceOptions) {
    return this.repository.updateById(id, data, options);
  }

  async deleteById(id: string, options?: ServiceOptions) {
    return this.repository.deleteById(id, options);
  }
}
