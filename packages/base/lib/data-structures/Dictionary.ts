import { Void, Volatile } from '..';
import isNullOrUndefined from '../helpers/isNullOrUndefined';
import IDictionary from '../interfaces/IDictionary';

export default class Dictionary<T extends {}> implements IDictionary<T> {
  public constructor(private __data = new Map<string, T>()) {}

  public get length(): number {
    return Object.keys(this.__data).length;
  }

  public read(key: string): Volatile<T> {
    return this.__data.get(key);
  }

  public write({ key, value }: { key: string; value: T }): void {
    this.__data.set(key, value);
  }

  public delete(key: string): void {
    this.__data.delete(key);
  }

  public find(fn: (value: T) => boolean): Volatile<T> {
    const key: Volatile<string> = Object.keys(this.__data).find((k) => fn(this.__data.get(k)!));
    // eslint-disable-next-line no-extra-boolean-cast
    return !!key ? this.__data.get(key) : undefined;
  }

  public filter(fn: (value: T) => boolean): T[] {
    return Object.keys(this.__data)
      .filter((k) => fn(this.__data.get(k)!))
      .map((k) => this.__data.get(k)!);
  }

  public forEach(fn: Void<T>): void {
    Object.keys(this.__data).forEach((key) => {
      if (!isNullOrUndefined(this.__data.get(key))) {
        fn(this.__data.get(key)!);
      }
    });
  }

  public every(fn: (value: T) => boolean): void {
    Object.keys(this.__data).every((key) => {
      if (!isNullOrUndefined(this.__data.get(key))) {
        return fn(this.__data.get(key)!);
      }
    });
  }

  public toArray(): T[] {
    const result: T[] = [];
    this.forEach((value) => result.push(value));
    return result;
  }

  public first(): Volatile<T> {
    return this.__data.get(Object.keys(this.__data)[0]);
  }

  public last(): Volatile<T> {
    return this.__data.get(Object.keys(this.__data)[this.length - 1]);
  }
}
