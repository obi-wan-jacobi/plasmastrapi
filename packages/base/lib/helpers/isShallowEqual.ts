export function isShallowEqual<T extends {}>(a: T, b: T, includeNumberRounding = false): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    for (const i of a) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (const key of Object.keys(a)) {
    let valueA = (a as any)[key];
    let valueB = (b as any)[key];
    if (typeof valueA === 'number' && includeNumberRounding) {
      valueA = Math.round(valueA);
      valueB = Math.round(valueB);
    }
    if (valueA !== valueB) {
      return false;
    }
  }
  return true;
}
