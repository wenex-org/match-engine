import { OrderDoc, RepositoryOptions } from '@app/common/interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Order } from './schema';

@Injectable()
export class OrdersRepository {
  constructor(@InjectModel(Order.name) readonly model: Model<OrderDoc>) {}

  async create(data: Order, options?: RepositoryOptions): Promise<OrderDoc> {
    return (await this.model.create([data], { session: options?.session })).pop();
  }

  async findById(id: string, options?: RepositoryOptions): Promise<OrderDoc> {
    return this.model.findById(id, undefined, { session: options?.session });
  }

  async updateById(
    id: string,
    data: Partial<Order>,
    options?: RepositoryOptions,
  ): Promise<OrderDoc> {
    return this.model
      .findByIdAndUpdate(id, data, {
        new: options.new ?? true,
        session: options?.session,
      })
      .exec();
  }

  async deleteById(id: string, options?: RepositoryOptions): Promise<OrderDoc> {
    return this.model
      .findByIdAndDelete(id, {
        session: options?.session,
      })
      .exec();
  }
}
