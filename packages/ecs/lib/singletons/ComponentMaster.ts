import { Dictionary, IDictionary, Void, Volatile } from '@plasmastrapi/base';
import { Ctor } from '..';
import IComponent from '../interfaces/IComponent';
import IComponentMaster from '../interfaces/IComponentMaster';
import { IOC } from './IOC';

class ComponentMaster implements IComponentMaster {
  private __componentMap: IDictionary<IDictionary<IComponent<any>>> = new Dictionary();
  private __registerTargets: IComponent<any>[] = [];
  private __purgeTargets: IComponent<any>[] = [];

  public constructor() {
    IOC.components = {
      register: (instance: IComponent<any>) => {
        this.__registerTargets.push(instance);
        return instance;
      },
      purge: (instance: IComponent<any>) => this.__purgeTargets.push(instance),
    };
  }

  public count<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>): number {
    const collection = this.__componentMap.read(ComponentClass.name);
    return collection ? collection.length : 0;
  }

  public forEvery<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>): Void<Void<T>> {
    const collection = this.__componentMap.read(ComponentClass.name);
    return collection ? collection.forEach.bind(collection) : () => undefined;
  }

  public find<T extends IComponent<TArg>, TArg extends {}>(
    ComponentClass: Ctor<T, TArg>,
  ): (fn: (component: T) => boolean) => Volatile<T> {
    return (fn: (component: T) => boolean): Volatile<T> => {
      const result = this.__componentMap.read(ComponentClass.name)!.find(fn);
      if (result) {
        return result as T;
      }
      return undefined;
    };
  }

  public upkeep(): void {
    this.__doRegistrations();
    this.__doPurgation();
  }

  public toArray<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>): IComponent<TArg>[] {
    return this.__componentMap.read(ComponentClass.name) ? this.__componentMap.read(ComponentClass.name)!.toArray() : [];
  }

  private __doRegistrations(): void {
    while (this.__registerTargets.length) {
      const target = this.__registerTargets.shift()!;
      let collection = this.__componentMap.read(target.constructor.name);
      if (!collection) {
        collection = new Dictionary();
        this.__componentMap.write({
          key: target.constructor.name,
          value: collection,
        });
      }
      collection.write({ key: target.$id, value: target });
    }
  }

  private __doPurgation(): void {
    while (this.__purgeTargets.length) {
      const target = this.__purgeTargets.shift()!;
      this.__componentMap.read(target.constructor.name)!.delete(target.$id);
    }
  }
}

export const COMPONENTS = new ComponentMaster();
