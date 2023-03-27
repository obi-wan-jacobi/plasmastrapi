// <autogen>
import Dictionary from './data-structures/Dictionary';
import IDictionary from './interfaces/IDictionary';
import IDisposable from './interfaces/IDisposable';
import IUnique from './interfaces/IUnique';
import Unique from './abstracts/Unique';
import clone from './helpers/clone';
import isNullOrUndefined from './helpers/isNullOrUndefined';
export { Unique, Dictionary, clone, isNullOrUndefined, IDictionary, IDisposable, IUnique };
// </autogen>
export type ABC<T> = { name: string; prototype: T };
export type Dict<T> = { [key: string]: T };
export type Volatile<T> = T | undefined;
export type Fn<TArg, TResult> = ({}: TArg) => TResult;
export type Void<T> = Fn<T, void>;
export type Constructor<TClass, TArg> = new ({}: TArg) => TClass;
export type Tuple<T1, T2> = [T1, T2];
