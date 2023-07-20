import { DeepPartial, IDictionary, IUnique, Void, Volatile } from '@plasmastrapi/base';
import IComponent from './IComponent';
import { Ctor } from '..';

export default interface IEntity extends IUnique {
  $parent: Volatile<IEntity>;
  readonly $children: IDictionary<IEntity>;
  $appendChild<T extends IEntity>(child: T): T;
  $removeChild<T extends IEntity>(child: T): void;
  $destroy(): void;
  $add<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>, data: TArg): this;
  $remove<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>): void;
  $has(ComponentClass: Ctor<IComponent<any>, any> | Ctor<IComponent<any>, any>[]): boolean;
  $copy<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>): TArg;
  $mutate<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>, data: TArg): this;
  $patch<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>, data: DeepPartial<TArg>): this;
  $get<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>): IComponent<TArg>;
  $forEach(fn: Void<IComponent<any>>): void;
}
