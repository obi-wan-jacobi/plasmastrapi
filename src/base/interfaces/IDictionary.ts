import { Void, Volatile } from 'base/types';

export default interface IDictionary<T extends {}> {

  length: number;

  read(key: string): Volatile<T>;

  write({ key, value }: { key: string; value: T }): void;

  delete(key: string): void;

  find(fn: (value: T) => boolean): Volatile<T>;

  filter(fn: (value: T) => boolean): T[];

  forEach(fn: Void<T>): void;

  every(fn: (value: T) => boolean): void;

  toArray(): T[];

}
