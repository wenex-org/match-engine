/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderPair, OrderSide, OrderType } from '@app/common/enums';

import { MakeRequired } from './generic.interface';

export type Serializer<
  T extends {
    id?: string;

    owner?: string;

    volume?: number;

    type?: OrderType;
    side?: OrderSide;
    pair?: OrderPair;

    version?: string;

    guid?: string;
  },
> = MakeRequired<
  T,
  'id' | 'owner' | 'volume' | 'type' | 'side' | 'pair' | 'version' | 'guid'
>;
