export function isDeepEqual<T>(a: T, b: T): boolean {
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === 'number' || typeof a === 'string' || typeof a === 'boolean') {
    return a === b;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0, L = a.length; i < L; ++i) {
      if (!isDeepEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  if (Object.keys(a as {}).length !== Object.keys(b as {}).length) {
    return false;
  }
  for (const key of Object.keys(a as {})) {
    if (!isDeepEqual((a as any)[key], (b as any)[key])) {
      return false;
    }
  }
  return true;
}
