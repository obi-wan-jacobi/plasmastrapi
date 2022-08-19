import IComponent from './IComponent';
import IUnique from 'base/interfaces/IUnique';
import { Ctor } from '../types';
import { Void, Volatile } from 'base/types';
import IDictionary from 'base/interfaces/IDictionary';

export default interface IEntity extends IUnique {
  $parent: Volatile<IEntity>;
  readonly $children: IDictionary<IEntity>;
  $appendChild<T extends IEntity>(child: T): T;
  $removeChild<T extends IEntity>(child: T): void;
  $destroy(): void;
  $add<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>, data: TArg): IEntity;
  $remove<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): void;
  $copy<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): Volatile<TArg>;
  $has(ComponentClass: Ctor<IComponent<any>, any> | Ctor<IComponent<any>, any>[]): boolean;
  $patch<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>, data: TArg | {}): IEntity;
  $forEach(fn: Void<IComponent<any>>): void;
}
