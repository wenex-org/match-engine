import { MakeOptional } from './generic.interface';

export type Dto<
  T extends {
    id?: string;
    version?: string;
  },
> = MakeOptional<T, 'id' | 'version'>;
