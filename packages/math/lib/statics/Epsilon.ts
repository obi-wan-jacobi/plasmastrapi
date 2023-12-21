export default abstract class Epsilon {
  public static readonly default = 0.000001;

  public static isRoughlyEqual<T extends { [key: string]: number }>(a: T, b: T, epsilon = Epsilon.default): boolean {
    for (const key of Object.keys(a)) {
      if (Math.abs(b[key] - a[key]) > epsilon) {
        return false;
      }
    }
    return true;
  }

  public static clamp(from: number, to: number, epsilon: number = Epsilon.default): number {
    return Math.abs(from - to) <= epsilon ? to : from;
  }
}
