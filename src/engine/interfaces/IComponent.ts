import IEntity from './IEntity';
import IUnique from 'base/interfaces/IUnique';

export default interface IComponent<T extends {}> extends IUnique {
  $entity: IEntity;
  copy(): T;
  mutate(data: T): void;
  patch(data: T): void;
}
