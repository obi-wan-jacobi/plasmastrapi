import lodash from 'lodash';
import { clone, Unique } from '@plasmastrapi/base';
import IEntity from '../interfaces/IEntity';
import IComponent from '../interfaces/IComponent';

export default abstract class Component<T extends {}> extends Unique implements IComponent<T> {
  public get $entity(): IEntity {
    return this.__$entity;
  }

  private __data: T;
  private __$entity: IEntity;

  constructor({ data, entity }: { data: T; entity: IEntity }) {
    super();
    this.__$entity = entity;
    this.mutate(data);
  }

  public copy(): T {
    return clone(this.__data) as T;
  }

  public mutate(data: T): void {
    this.__data = clone(data) as T;
  }

  public patch(data: {}): void {
    this.mutate(lodash.merge(this.copy(), data));
  }
}
