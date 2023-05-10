export default function rotateArray<T>(source: T[], n: number): T[] {
  const len = source.length;
  n = ((n % len) + len) % len;
  return source.slice(n).concat(source.slice(0, n));
}
