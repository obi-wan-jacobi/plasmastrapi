
export type Dict<T> = { [key: string]: T };
export type Volatile<T> = T | undefined;

export type Fn<TArg, TResult> = ({}: TArg) => TResult;
export type Void<T> = Fn<T, void>;
export type Constructor<TClass, TArg> = new ({}: TArg) => TClass;
export type Tuple<T1, T2> = [T1, T2];