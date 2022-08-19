import IComponent from '../interfaces/IComponent';
import IEntity from '../interfaces/IEntity';
import Unique from 'base/abstracts/Unique';
import Dictionary from 'base/data-structures/Dictionary';
import IDictionary from 'base/interfaces/IDictionary';
import { Ctor } from '../types';
import { Void, Volatile } from 'base/types';
import { hereditary } from 'engine/decorators/hereditary';

export const IOC = {
  entities: {
    register: (entity: IEntity): IEntity => entity,
    purge: ({}: IEntity): void => undefined,
  },
  components: {
    register: (component: IComponent<any>): IComponent<any> => component,
    purge: ({}: IComponent<any>): void => undefined,
  },
};

export default abstract class Entity extends Unique implements IEntity {

  private __components: IDictionary<IComponent<any>> = new Dictionary();

  protected _parent: Volatile<IEntity>;
  protected _children: IDictionary<IEntity>;

  public constructor() {
    super();
    IOC.entities.register(this);
    this._children = new Dictionary();
  }

  public get $parent(): Volatile<IEntity> {
    return this._parent;
  }

  public set $parent(parent: Volatile<IEntity>) {
    if (this.$parent) {
      console.warn(`${this.constructor.name} already has a parent: ${this.$parent.constructor.name}`);
      // throw new Error(
      //   `${child.constructor.name} already has a parent: ${child.$parent.constructor.name}`
      // );
    }
    this._parent = parent;
  }

  public get $children(): IDictionary<IEntity> {
    return this._children;
  }

  public $appendChild<T extends IEntity>(child: T): T {
    this._children.write({ key: child.$id, value: child });
    (child as unknown as IEntity).$parent = this;
    return child;
  }

  public $removeChild<T extends IEntity>(child: T): T {
    this._children.delete(child.$id);
    (child as unknown as IEntity).$parent = undefined;
    return child;
  }

  @hereditary
  public $destroy(): void {
    IOC.entities.purge(this);
    this.$forEach((component) => IOC.components.purge(component));
    this.$parent?.$removeChild(this);
  }

  public $add<T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>, data: TArg): this {
    if (!this.__components.read(ComponentClass.name)) {
      const component = new ComponentClass({ data, entity: this });
      this.__components.write({
        key: ComponentClass.name,
        value: IOC.components.register(component),
      });
      return this;
    }
    this.$patch(ComponentClass, data);
    return this;
  }

  public readonly $remove = <T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): void => {
    const component = this.__components.read(ComponentClass.name);
    if (!component) {
      return;
    }
    this.__components.delete(ComponentClass.name);
    IOC.components.purge(component);
  };

  public readonly $has = (ComponentClass: Ctor<IComponent<any>, any> | Ctor<IComponent<any>, any>[]): boolean => {
    if (ComponentClass instanceof Array) {
      return ComponentClass.reduce((result, component) => {
        return result && this.$has(component);
      }, true);
    }
    return !!this.$copy(ComponentClass);
  };

  public readonly $copy = <T extends IComponent<TArg>, TArg>(ComponentClass: Ctor<T, TArg>): Volatile<TArg> => {
    const component = this.__components.read(ComponentClass.name);
    return component ? component.copy() : undefined;
  };

  public $patch<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>, data: TArg | {}): this {
    const component = this.__components.read(ComponentClass.name);
    if (!component) {
      console.warn(`${this.constructor.name} does not have a ${ComponentClass.name} to $patch.`);
    }
    component?.patch(data);
    return this;
  }

  public readonly $forEach = (fn: Void<IComponent<any>>): void => {
    return this.__components.forEach(fn);
  };

}
