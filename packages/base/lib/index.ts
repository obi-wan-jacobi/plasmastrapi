// <autogen>
import Dictionary from './data-structures/Dictionary';
import IDictionary from './interfaces/IDictionary';
import IDisposable from './interfaces/IDisposable';
import IUnique from './interfaces/IUnique';
import Unique from './abstracts/Unique';
import clone from './helpers/clone';
import isNullOrUndefined from './helpers/isNullOrUndefined';
import rotateArray from './helpers/rotateArray';
import { isShallowEqual } from './helpers/isShallowEqual';
export { Unique, Dictionary, clone, isNullOrUndefined, isShallowEqual, rotateArray, IDictionary, IDisposable, IUnique };
// </autogen>
export type ABC<T> = { name: string; prototype: T };
export type Index<T> = { [key: string]: T };
export type Dict<T> = Index<T> & Map<string, T>;
export type Volatile<T> = T | undefined;
export type Fn<TArg, TResult> = ({}: TArg) => TResult;
export type Void<T> = Fn<T, void>;
export type Constructor<TClass, TArg> = new ({}: TArg) => TClass;
export type Tuple<T1, T2> = [T1, T2];
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
