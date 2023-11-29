import { Model as ModelInterface, Order } from '@app/common/interfaces';
import { OrderType } from '@app/common/enums';
import { HttpStatus } from '@nestjs/common';
import { Model } from '@app/common/classes';
import { expect } from '@app/common/utils';

export class OrderModel extends Model<Order> implements ModelInterface<Order> {
  check(): this {
    expect(
      this.data.volume > 0,
      'volume must be greater than zero',
      HttpStatus.BAD_REQUEST,
    );

    switch (this.data.type) {
      case OrderType.OCO:
        this.checkTypeOCO();
        break;
      case OrderType.limit:
        this.checkTypeLimit();
        break;
      case OrderType.Market:
        this.checkTypeMarket();
        break;
      case OrderType.StopLimit:
        this.checkTypeStopLimit();
        break;
      default:
        expect(false, 'unknown type', HttpStatus.BAD_REQUEST);
    }

    return this;
  }

  checkTypeOCO() {
    const { price, stop_limit, take_profit } = this.data;

    expect(
      !!price && !!stop_limit && !!take_profit,
      'oco request not acceptable',
      HttpStatus.NOT_ACCEPTABLE,
    );

    expect(
      stop_limit < price && take_profit > price,
      'price is not correct',
      HttpStatus.BAD_REQUEST,
    );

    this.checkPrices(price, stop_limit, take_profit);
  }

  checkTypeLimit() {
    const { price, stop_limit, take_profit } = this.data;

    expect(
      !!price && !stop_limit && !take_profit,
      'limit request not acceptable',
      HttpStatus.NOT_ACCEPTABLE,
    );

    this.checkPrices(price);
  }

  checkTypeMarket() {
    const { price, stop_limit, take_profit } = this.data;

    expect(
      !price && !stop_limit && !take_profit,
      'limit request not acceptable',
      HttpStatus.NOT_ACCEPTABLE,
    );
  }

  checkTypeStopLimit() {
    const { price, stop_limit, take_profit } = this.data;

    expect(
      !!price && ((!!stop_limit && !take_profit) || (!stop_limit && !!take_profit)),
      'limit request not acceptable',
      HttpStatus.NOT_ACCEPTABLE,
    );

    if (!!stop_limit && !take_profit) {
      expect(
        stop_limit < price,
        'price must be greater than stop_limit',
        HttpStatus.BAD_REQUEST,
      );

      this.checkPrices(price, stop_limit);
    } else if (!stop_limit && !!take_profit) {
      expect(
        take_profit > price,
        'price must be less than take_profit',
        HttpStatus.BAD_REQUEST,
      );

      this.checkPrices(price, take_profit);
    }
  }

  checkPrices(...prices: number[]) {
    prices.forEach((price) =>
      expect(price > 0, 'price must be greater than zero', HttpStatus.BAD_REQUEST),
    );
  }

  static build(data: Order) {
    return new OrderModel(data);
  }
}
