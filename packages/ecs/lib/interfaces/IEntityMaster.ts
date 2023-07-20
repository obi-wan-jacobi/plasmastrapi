import { Fn, Void, Volatile } from '@plasmastrapi/base';
import IEntity from './IEntity';
import { Etor } from '..';

export default interface IEntityMaster {
  upkeep(): void;
  count<T extends IEntity>(EntityCls: Etor<T>): number;
  find<T extends IEntity>(EntityClass: Etor<T>): Fn<Fn<T, Boolean>, Volatile<T>>;
  first<T extends IEntity>(EntityClass: Etor<T>): Volatile<T>;
  last<T extends IEntity>(EntityClass: Etor<T>): Volatile<T>;
  forEvery<T extends IEntity>(EntityClass: Etor<T>): Void<Void<T>>;
  get(id: string): Volatile<IEntity>;
  reId(id: string, newId: string): void;
}
