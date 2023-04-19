import { IUnique } from '@plasmastrapi/base';
import IEntity from './IEntity';

export default interface IComponent<T extends {}> extends IUnique {
  $entity: IEntity;
  copy(): T;
  mutate(data: T): void;
  patch(data: T | {}): void;
}
