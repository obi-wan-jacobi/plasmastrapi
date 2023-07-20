import lodash from 'lodash';
import { clone, DeepPartial, Index, Unique } from '@plasmastrapi/base';
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

  public patch(data: DeepPartial<T>): void {
    this.mutate(mergeWithIncludingUndefined(this.copy(), data));
  }
}

function mergeWithIncludingUndefined<T extends {}>(src: T, data: DeepPartial<T>): T {
  // https://stackoverflow.com/questions/66247060/how-to-merge-objects-with-lodash-but-replace-arrays-values
  const result = lodash.mergeWith(src, data, (a, b) => (lodash.isArray(b) ? b : undefined));
  return persistUndefinedValues(result, data);
}

function persistUndefinedValues<T extends {}>(src: T, data: DeepPartial<T>): T {
  for (const key of Object.keys(data)) {
    if ((data as Index<any>)[key] === undefined) {
      (src as Index<any>)[key] = undefined;
      continue;
    }
    if (typeof (data as Index<any>)[key] === 'object') {
      (src as Index<any>)[key] = persistUndefinedValues((src as Index<any>)[key], (data as Index<any>)[key]);
    }
  }
  return src;
}
