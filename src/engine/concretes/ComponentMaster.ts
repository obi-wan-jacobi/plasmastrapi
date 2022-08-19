import { IOC } from 'engine/abstracts/Entity';
import IComponent from 'engine/interfaces/IComponent';
import IComponentMaster from 'engine/interfaces/IComponentMaster';
import { ComponentClass } from 'engine/types';
import Dictionary from 'base/data-structures/Dictionary';
import IDictionary from 'base/interfaces/IDictionary';
import { Void, Volatile } from 'base/types';

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

  public forEvery<T extends IComponent<TArg>, TArg>(ComponentCls: ComponentClass<T, TArg>): Void<Void<T>> {
    const collection = this.__componentMap.read(ComponentCls.name);
    return collection ? collection.forEach.bind(collection) : () => undefined;
  }

  public find<T extends IComponent<TArg>, TArg>(ComponentCls: ComponentClass<T, TArg>):
  (fn: (component: T) => boolean) => Volatile<T> {
    return (fn: ((component: T) => boolean)): Volatile<T> => {
      const result = this.__componentMap.read(ComponentCls.name)!.find(fn);
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

  public toArray<T extends IComponent<TArg>, TArg>(ComponentCls: ComponentClass<T, TArg>): IComponent<TArg>[] {
    return this.__componentMap.read(ComponentCls.name)
      ? this.__componentMap.read(ComponentCls.name)!.toArray()
      : [];
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
