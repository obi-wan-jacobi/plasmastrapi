export function toNumber(a: unknown): number {
  return typeof a === 'number' ? a : 0;
}

export const pow2 = (target: number): number => {
  return Math.pow(target, 2);
};
