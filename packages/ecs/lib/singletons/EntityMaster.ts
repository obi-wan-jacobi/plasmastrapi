import Entity from '../abstracts/Entity';
import { Dictionary, IDictionary, Void, Volatile } from '@plasmastrapi/base';
import IEntityMaster from '../interfaces/IEntityMaster';
import IEntity from '../interfaces/IEntity';
import { Etor } from '..';

class EntityMaster implements IEntityMaster {
  private __entityMap: IDictionary<IDictionary<IEntity>> = new Dictionary();
  private __registerTargets: IEntity[] = [];
  private __purgeTargets: IEntity[] = [];

  public register(instance: IEntity) {
    this.__registerTargets.push(instance);
    return instance;
  }

  public purge(instance: IEntity) {
    this.__purgeTargets.push(instance);
  }

  public count<T extends IEntity>(EntityClass: Etor<T>): number {
    const collection = this.__entityMap.read(EntityClass.name);
    return collection ? collection.length : 0;
  }

  public forEvery<T extends IEntity>(EntityClass: Etor<T>): Void<Void<T>> {
    const collection = this.__entityMap.read(EntityClass.name);
    return collection ? collection.forEach.bind(collection) : (): void => undefined;
  }

  public find<T extends IEntity>(EntityClass: Etor<T>): (fn: (entity: T) => boolean) => Volatile<T> {
    return (fn: (entity: T) => boolean): Volatile<T> => {
      if (!this.__entityMap.read(EntityClass.name)) {
        return undefined;
      }
      const result = this.__entityMap.read(EntityClass.name)!.find(fn);
      if (result) {
        return result as T;
      }
      return undefined;
    };
  }

  public first<T extends IEntity>(EntityClass: Etor<T>): Volatile<T> {
    return this.__entityMap.read(EntityClass.name)?.first() as Volatile<T>;
  }

  public last<T extends IEntity>(EntityClass: Etor<T>): Volatile<T> {
    return this.__entityMap.read(EntityClass.name)?.last() as Volatile<T>;
  }

  public upkeep(): void {
    this.__doRegistrations();
    this.__doPurges();
  }

  public get(id: string): Volatile<IEntity> {
    return this.__entityMap.read(Entity.name)?.read(id);
  }

  public reId(id: string, newId: string): void {
    let target = this.get(id);
    if (target) {
      this.__purge(target);
    } else {
      target = this.__registerTargets.find((t) => t.$id === id);
      if (!target) {
        throw new Error(`Entity with ID <${id}> does not exist!`);
      }
      this.__registerTargets.splice(this.__registerTargets.indexOf(target), 1);
    }
    (target as any).__id = newId;
    this.__register(target);
    this.forEvery(Entity)((entity) => {
      const child = entity.$children.read(id);
      if (child) {
        entity.$children.delete(id);
        entity.$children.write({ key: newId, value: child });
      }
    });
  }

  private __doRegistrations(): void {
    while (this.__registerTargets.length) {
      const instance = this.__registerTargets.shift()!;
      this.__register(instance);
    }
  }

  private __register(instance: IEntity) {
    let target: any = instance;
    while (target) {
      let collection = this.__entityMap.read(target.constructor.name);
      if (!collection) {
        collection = new Dictionary();
        this.__entityMap.write({
          key: target.constructor.name,
          value: collection,
        });
      }
      collection.write({ key: instance.$id, value: instance });
      target = target.__proto__;
    }
  }

  private __doPurges(): void {
    while (this.__purgeTargets.length) {
      const instance = this.__purgeTargets.shift()!;
      this.__purge(instance);
    }
  }

  private __purge(instance: IEntity) {
    const id = instance.$id;
    while (instance) {
      this.__entityMap.read(instance.constructor.name)!.delete(id);
      instance = (instance as any).__proto__;
    }
  }
}

export const ENTITIES = new EntityMaster();
