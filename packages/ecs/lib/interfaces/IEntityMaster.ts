import { Fn, Void, Volatile } from '@plasmastrapi/base';
import { EntityClass } from '..';
import IEntity from './IEntity';

export default interface IEntityMaster {
  upkeep(): void;
  count<T extends IEntity>(EntityCls: EntityClass<T>): number;
  find<T extends IEntity>(EntityClass: EntityClass<T>): Fn<Fn<T, Boolean>, Volatile<T>>;
  first<T extends IEntity>(EntityClass: EntityClass<T>): Volatile<T>;
  last<T extends IEntity>(EntityClass: EntityClass<T>): Volatile<T>;
  forEvery<T extends IEntity>(EntityClass: EntityClass<T>): Void<Void<T>>;
  get(id: string): Volatile<IEntity>;
  reId(id: string, newId: string): void;
}
