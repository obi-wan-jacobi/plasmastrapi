import { IPoint } from '../interfaces/IPoint';

export default abstract class Epsilon {
  public static isRoughlyEqual(a: IPoint, b: IPoint, epsilon = 0.000001): boolean {
    return Math.abs(b.x - a.x) <= epsilon && Math.abs(b.y - a.y) <= epsilon;
  }

  public static clamp(from: number, to: number, epsilon: number): number {
    return Math.abs(from - to) <= epsilon ? to : from;
  }
}
