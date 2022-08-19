import { Void } from 'base/types';
import { Stor } from 'engine/types';
import ISystem from './ISystem';

export default interface ISystemMaster {
  add(SystemCtor: Stor): void;
  remove(SystemCtor: Stor): void;
  forEach(fn: Void<ISystem>): void;
}