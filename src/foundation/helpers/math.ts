
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function toNumber(a: any): number {
  return typeof a === 'number' ? a : 0;
}