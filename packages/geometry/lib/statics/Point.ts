import { IPoint } from '../interfaces/IPoint';

export default abstract class Point {
  public static rotateAboutOrigin(point: IPoint, orientation: number): IPoint {
    const s = Math.sin(orientation);
    const c = Math.cos(orientation);
    return {
      x: point.x * c - point.y * s,
      y: point.x * s + point.y * c,
    };
  }

  public static getEuclideanDistanceBetweenPoints(p1: IPoint, p2: IPoint): number {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  public static getAngleBetweenPoint(p1: IPoint, p2: IPoint): number {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
  }

  public static orientation(p: IPoint, q: IPoint, r: IPoint): number {
    const a = { x: q.x - p.x, y: q.y - p.y };
    const b = { x: r.x - p.x, y: r.y - p.y };
    const val = a.x * b.y - a.y * b.x;
    if (val === 0) return 0;
    // reverse the sign because we're upside-down (assume html-canvas...)
    return val > 0 ? -1 : 1;
  }
}
