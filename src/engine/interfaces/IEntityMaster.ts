import IEntity from './IEntity';
import { EntityClass } from '../types';
import { Fn, Void, Volatile } from 'base/types';

export default interface IEntityMaster {
  upkeep(): void;
  find<T extends IEntity>(EntityClass: EntityClass<T>): Fn<Fn<T, Boolean>, Volatile<T>>;
  first<T extends IEntity>(EntityClass: EntityClass<T>): Volatile<T>;
  last<T extends IEntity>(EntityClass: EntityClass<T>): Volatile<T>;
  forEvery<T extends IEntity>(EntityClass: EntityClass<T>): Void<Void<T>>;
  get(id: string): Volatile<IEntity>;
  reId(id: string, newId: string): void;

}
