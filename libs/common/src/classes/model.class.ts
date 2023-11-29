import { Model as ModelInterface } from '../interfaces';

export class Model<T> implements ModelInterface<T> {
  constructor(protected readonly data: T) {}

  check(): this {
    return this;
  }

  get value(): T {
    return this.data;
  }

  get isValid(): boolean {
    try {
      this.check();
      return true;
    } catch {
      return false;
    }
  }
}
