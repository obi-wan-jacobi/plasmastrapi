import { Void, Volatile } from '@plasmastrapi/base';
import { ComponentClass } from '..';
import IComponent from './IComponent';

export default interface IComponentMaster {
  upkeep(): void;

  find<T extends IComponent<TArg>, TArg extends {}>(ComponentCls: ComponentClass<T, TArg>): (fn: (component: T) => boolean) => Volatile<T>;

  forEvery<T extends IComponent<TArg>, TArg extends {}>(ComponentCls: ComponentClass<T, TArg>): Void<Void<T>>;

  toArray<T extends IComponent<TArg>, TArg extends {}>(ComponentCls: ComponentClass<T, TArg>): IComponent<TArg>[];
}
