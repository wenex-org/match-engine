export interface Model<T> {
  check(): this;

  get value(): T;
  get isValid(): boolean;
}
