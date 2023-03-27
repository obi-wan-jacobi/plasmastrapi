import { Dictionary, IDictionary, Void } from '@plasmastrapi/base';
import { Stor } from '..';
import ISystem from '../interfaces/ISystem';
import ISystemMaster from '../interfaces/ISystemMaster';

class SystemMaster implements ISystemMaster {
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

export const SYSTEMS = new SystemMaster();
