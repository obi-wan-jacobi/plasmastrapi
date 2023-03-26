import { IDictionary, IUnique, Void, Volatile } from '@plasmastrapi/base';
import IComponent from './IComponent';
import { Ctor } from '..';

export default interface IEntity extends IUnique {
  $parent: Volatile<IEntity>;
  readonly $children: IDictionary<IEntity>;
  $appendChild<T extends IEntity>(child: T): T;
  $removeChild<T extends IEntity>(child: T): void;
  $destroy(): void;
  $add<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>, data: TArg): IEntity;
  $remove<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>): void;
  $copy<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>): Volatile<TArg>;
  $has(ComponentClass: Ctor<IComponent<any>, any> | Ctor<IComponent<any>, any>[]): boolean;
  $patch<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>, data: TArg | {}): IEntity;
  $get<T extends IComponent<any>>(ComponentClass: Ctor<T, any>): Volatile<IComponent<any>>;
  $forEach(fn: Void<IComponent<any>>): void;
}
