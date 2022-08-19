import IEntity from '../interfaces/IEntity';
import IEntityMaster from '../interfaces/IEntityMaster';
import Dictionary from 'base/data-structures/Dictionary';
import IDictionary from 'base/interfaces/IDictionary';
import { Dict, Void, Volatile } from 'base/types';
import { EntityClass } from '../types';
import Entity, { IOC } from '../abstracts/Entity';

class EntityMaster implements IEntityMaster {

  private __entityMap: IDictionary<IDictionary<IEntity>> = new Dictionary();
  private __registerTargets: IEntity[] = [];
  private __purgeTargets: IEntity[] = [];

  public constructor() {
    IOC.entities = {
      register: (instance: IEntity) => {
        this.__registerTargets.push(instance);
        return instance;
      },
      purge: (instance: IEntity) => {
        this.__purgeTargets.push(instance);
      },
    };
  }

  public forEvery<T extends IEntity>(EntityCls: EntityClass<T>): Void<Void<T>> {
    const collection = this.__entityMap.read(EntityCls.name);
    return collection ? collection.forEach.bind(collection) : (): void => undefined;
  }

  public find<T extends IEntity>(EntityCls: EntityClass<T>): (fn: (entity: T) => boolean) => Volatile<T> {
    return (fn: ((entity: T) => boolean)): Volatile<T> => {
      if (!this.__entityMap.read(EntityCls.name)) {
        return undefined;
      }
      const result = this.__entityMap.read(EntityCls.name)!.find(fn);
      if (result) {
        return result as T;
      }
      return undefined;
    };
  }

  public first<T extends IEntity>(EntityCls: EntityClass<T>): Volatile<T> {
    const result = this.__entityMap.read(EntityCls.name)?.toArray();
    if (!result) {
      return undefined;
    }
    return result[0] as T;
  }

  public last<T extends IEntity>(EntityCls: EntityClass<T>): Volatile<T> {
    const result = this.__entityMap.read(EntityCls.name)?.toArray();
    if (!result) {
      return undefined;
    }
    return result[result.length - 1] as T;
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
      instance = (instance as Dict<any>).__proto__;
    }
  }
}

export const ENTITIES = new EntityMaster();
