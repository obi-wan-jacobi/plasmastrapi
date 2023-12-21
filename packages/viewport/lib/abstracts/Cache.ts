import { Dict } from '@plasmastrapi/base';
import ICache from '../interfaces/ICache';

export default abstract class Cache<TData, TDataSource> implements ICache<TData, TDataSource> {
  private __data: Dict<TData> = new Map() as Dict<TData>;

  public load(key: string, data?: TData): TDataSource {
    if (!this.__data.get(key)) {
      this.__data.set(key, data!);
    }
    return this.__data.get(key)! as TDataSource;
  }
}
