export default interface ICache<TData, TSource> {
  load(key: string, data?: TData): TSource;
}
