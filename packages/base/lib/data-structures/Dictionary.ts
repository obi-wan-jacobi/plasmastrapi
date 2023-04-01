import { Void, Volatile } from '..';
import IDictionary from '../interfaces/IDictionary';

export default class Dictionary<T extends {}> implements IDictionary<T> {
  public constructor(private __data = new Map<string, T>()) {}

  public get length(): number {
    return this.__data.size;
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
    for (const x of this.__data.values()) {
      if (fn(x)) {
        return x;
      }
    }
  }

  public filter(fn: (value: T) => boolean): T[] {
    const results: T[] = [];
    for (const x of this.__data.values()) {
      if (fn(x)) {
        results.push(x);
      }
    }
    return results;
  }

  public forEach(fn: Void<T>): void {
    this.__data.forEach(fn);
  }

  public every(fn: (value: T) => boolean): boolean {
    for (const x of this.__data.values()) {
      if (!fn(x)) {
        return false;
      }
    }
    return true;
  }

  public toArray(): T[] {
    return Array.from(this.__data.values());
  }

  public first(): Volatile<T> {
    return this.__data.values().next().value;
  }

  public last(): Volatile<T> {
    return Array.from(this.__data.values()).pop();
  }
}
