import { Void } from '@plasmastrapi/base';
import { Stor } from '..';
import ISystem from './ISystem';

export default interface ISystemMaster {
  add(SystemCtor: Stor): void;
  remove(SystemCtor: Stor): void;
  forEach(fn: Void<ISystem>): void;
}
