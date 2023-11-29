import * as crypto from 'crypto';

import { UUID_CODE_LEN } from '../consts';

export const code = (len: number) => {
  if (len < 1) throw new Error('len of code cannot be lower than one');

  const max = parseInt(`9${'9'.repeat(len - 1)}`, 10);
  const min = parseInt(`1${'0'.repeat(len - 1)}`, 10);

  return crypto.randomInt(min, max);
};

export const uuid = (len = UUID_CODE_LEN) => {
  return `${Date.now()}-${code(len)}`;
};
