import { Dictionary, IDictionary, Unique, Void, Volatile } from '@plasmastrapi/base';
import { Ctor } from '..';
import hereditary from '../decorators/hereditary';
import IComponent from '../interfaces/IComponent';
import IEntity from '../interfaces/IEntity';
import { IOC } from '../singletons/IOC';

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

  public $add<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>, data: TArg): this {
    const component = this.__components.read(ComponentClass.name);
    if (!component) {
      const component = new ComponentClass({ data, entity: this });
      this.__components.write({
        key: ComponentClass.name,
        value: IOC.components.register(component),
      });
      return this;
    }
    component.mutate(data);
    return this;
  }

  public $remove<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>): void {
    const component = this.__components.read(ComponentClass.name);
    if (!component) {
      return;
    }
    this.__components.delete(ComponentClass.name);
    IOC.components.purge(component);
  }

  public $has(ComponentClass: Ctor<IComponent<any>, any> | Ctor<IComponent<any>, any>[]): boolean {
    if (ComponentClass instanceof Array) {
      return ComponentClass.reduce((result, component) => {
        return result && this.$has(component);
      }, true);
    }
    return !!this.$copy(ComponentClass);
  }

  public $copy<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>): Volatile<TArg> {
    const component = this.__components.read(ComponentClass.name);
    return component ? component.copy() : undefined;
  }

  public $mutate<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>, data: TArg): this {
    const component = this.__components.read(ComponentClass.name);
    if (!component) {
      throw new Error(`${this.constructor.name} does not have a ${ComponentClass.name} to $mutate.`);
    }
    component.mutate(data);
    return this;
  }

  public $patch<T extends IComponent<TArg>, TArg extends {}>(ComponentClass: Ctor<T, TArg>, data: TArg | {}): this {
    const component = this.__components.read(ComponentClass.name);
    if (!component) {
      throw new Error(`${this.constructor.name} does not have a ${ComponentClass.name} to $patch.`);
    }
    component.patch(data);
    return this;
  }

  public $get<T extends IComponent<any>>(ComponentClass: Ctor<T, any>): Volatile<IComponent<any>> {
    return this.__components.read(ComponentClass.name);
  }

  public $forEach(fn: Void<IComponent<any>>): void {
    return this.__components.forEach(fn);
  }
}
