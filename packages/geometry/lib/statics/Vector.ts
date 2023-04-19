import { pow2 } from '@plasmastrapi/math';
import { getDirectionVectorAB, getEuclideanDistanceBetweenPoints } from '../geometry';
import { INormalizedVector } from '../interfaces/INormalizedVector';
import { IPoint } from '../interfaces/IPoint';
import { IVector } from '../interfaces/IVector';

export abstract class Vector {
  public static normalizeFromPoints(p1: IPoint, p2: IPoint): INormalizedVector {
    return {
      direction: getDirectionVectorAB(p1, p2),
      magnitude: getEuclideanDistanceBetweenPoints(p1, p2),
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
    return Math.sqrt(pow2(v.x) + pow2(v.y));
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
}
