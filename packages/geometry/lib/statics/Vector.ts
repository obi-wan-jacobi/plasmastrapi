import { INormalizedVector } from '../interfaces/INormalizedVector';
import { IPoint } from '../interfaces/IPoint';
import { IVector } from '../interfaces/IVector';
import Point from './Point';

export abstract class Vector {
  public static normalizeFromPoints(p1: IPoint, p2: IPoint): INormalizedVector {
    return {
      direction: getDirectionVectorAB(p1, p2),
      magnitude: Point.getEuclideanDistanceBetweenPoints(p1, p2),
    };
  }

  public static normalize(v: IVector): INormalizedVector {
    const magnitude = Vector.magnitude(v);
    if (magnitude === 0) {
      return {
        direction: { x: 0, y: 0 },
        magnitude,
      };
    }
    return {
      direction: { x: v.x / magnitude, y: v.y / magnitude },
      magnitude,
    };
  }

  public static expand(v: INormalizedVector): IVector {
    return {
      x: v.magnitude * v.direction.x,
      y: v.magnitude * v.direction.y,
    };
  }

  public static multiply(v: INormalizedVector, scalar: number): INormalizedVector {
    return {
      direction: {
        x: v.direction.x,
        y: v.direction.y,
      },
      magnitude: v.magnitude * scalar,
    };
  }

  public static dotProduct(v1: INormalizedVector, v2: INormalizedVector): number {
    const a = Vector.expand(v1);
    const b = Vector.expand(v2);
    return a.x * b.x + a.y * b.y;
  }

  public static magnitude(v: IVector): number {
    return Math.sqrt(v.x ** 2 + v.y ** 2);
  }

  public static subtractAfromB(a: INormalizedVector, b: INormalizedVector): INormalizedVector {
    const w = Vector.expand(b);
    const v = Vector.expand(a);
    return Vector.normalize({ x: w.x - v.x, y: w.y - v.y });
  }

  public static projectAOntoB(a: INormalizedVector, b: INormalizedVector): INormalizedVector {
    const v = Vector.expand(b);
    const m = Vector.magnitude(v);
    if (m === 0) {
      return Vector.normalize({ x: 0, y: 0 });
    }
    const u = { x: v.x / m, y: v.y / m };
    const proj = Vector.dotProduct(a, b) / m;
    return Vector.normalize({ x: proj * u.x, y: proj * u.y });
  }

  public static add(v1: INormalizedVector, v2: INormalizedVector): INormalizedVector {
    const x = v1.direction.x * v1.magnitude + v2.direction.x * v2.magnitude;
    const y = v1.direction.y * v1.magnitude + v2.direction.y * v2.magnitude;
    const magnitude = Vector.magnitude({ x, y });
    if (magnitude === 0) {
      return { direction: { x: 0, y: 0 }, magnitude: 0 };
    }
    return {
      direction: {
        x: x / magnitude,
        y: y / magnitude,
      },
      magnitude,
    };
  }

  public static perpendicular(v: INormalizedVector): INormalizedVector {
    return { direction: { x: -v.direction.y, y: v.direction.x }, magnitude: v.magnitude };
  }

  public static reverse(v: INormalizedVector): INormalizedVector {
    return { direction: { x: -v.direction.x, y: -v.direction.y }, magnitude: v.magnitude };
  }

  public static crossProduct(a: INormalizedVector, b: INormalizedVector): number {
    const v1 = Vector.expand(a);
    const v2 = Vector.expand(b);
    return v1.x * v2.y - v1.y * v2.x;
  }

  public static orientation(p: IPoint, q: IPoint, r: IPoint, epsilon = 0.000001): number {
    const a = { x: q.x - p.x, y: q.y - p.y };
    const b = { x: r.x - p.x, y: r.y - p.y };
    const val = a.x * b.y - a.y * b.x;
    if (Math.abs(val) <= epsilon) return 0;
    // reverse the sign because we're upside-down (assume html-canvas...)
    return val > 0 ? -1 : 1;
  }
}

const getDirectionVectorAB = (a: IPoint, b: IPoint): { x: number; y: number } => {
  const v = {
    x: b.x - a.x,
    y: b.y - a.y,
  };
  const magnitude = Point.getEuclideanDistanceBetweenPoints(b, a);
  return {
    x: v.x / magnitude,
    y: v.y / magnitude,
  };
};
