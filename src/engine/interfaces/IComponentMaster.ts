import { ComponentClass } from 'engine/types';
import { Void, Volatile } from 'base/types';
import IComponent from './IComponent';

export default interface IComponentMaster {

  upkeep(): void;

  find<T extends IComponent<TArg>, TArg>(ComponentCls: ComponentClass<T, TArg>): (fn: (component: T) => boolean) => Volatile<T>;

  forEvery<T extends IComponent<TArg>, TArg>(ComponentCls: ComponentClass<T, TArg>): Void<Void<T>>;

  toArray<T extends IComponent<TArg>, TArg>(ComponentCls: ComponentClass<T, TArg>): IComponent<TArg>[];

}
