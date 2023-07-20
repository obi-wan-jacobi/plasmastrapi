import { Void, Volatile } from '@plasmastrapi/base';
import { Ctor } from '..';
import IComponent from './IComponent';

export default interface IComponentMaster {
  upkeep(): void;
  count<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>): number;
  find<T extends IComponent<TArg>, TArg extends {}>(
    ComponentClass: Ctor<T, TArg>,
  ): (fn: (component: T) => boolean) => Volatile<T>;
  forEvery<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>): Void<Void<T>>;
  toArray<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>): IComponent<TArg>[];
}
