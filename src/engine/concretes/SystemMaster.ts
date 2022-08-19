import Dictionary from 'base/data-structures/Dictionary';
import IDictionary from 'base/interfaces/IDictionary';
import { Void } from 'base/types';
import ISystem from 'engine/interfaces/ISystem';
import ISystemMaster from 'engine/interfaces/ISystemMaster';
import { Stor } from 'engine/types';

export default class SystemMaster implements ISystemMaster {

  private __systems: IDictionary<ISystem> = new Dictionary();

  public add(SystemCtor: Stor): void {
    this.__systems.write({
      key: SystemCtor.name,
      value: new SystemCtor(),
    });
  }

  public remove(SystemCtor: Stor): void {
    this.__systems.delete(SystemCtor.name);
  }

  public forEach(fn: Void<ISystem>): void {
      this.__systems.forEach(fn);
  }

}