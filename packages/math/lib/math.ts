export function toNumber(a: unknown): number {
  return typeof a === 'number' ? a : 0;
}
