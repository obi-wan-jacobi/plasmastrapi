import { IShape } from '../components/ShapeComponent';
import IGBOX from '../interfaces/IGBOX';
import { Epsilon } from '@plasmastrapi/math';

export default abstract class GBOX {
  private constructor() {}

  public static create(shape: IShape, epsilon = Epsilon.default): IGBOX {
    const vertices = shape.vertices;
    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    for (let i = 0, L = vertices.length; i < L; i++) {
      const vertex = vertices[i];
      if (vertex.x < minX) {
        minX = vertex.x;
      }
      if (vertex.y < minY) {
        minY = vertex.y;
      }
      if (vertex.x > maxX) {
        maxX = vertex.x;
      }
      if (vertex.y > maxY) {
        maxY = vertex.y;
      }
    }
    return {
      v1: { x: minX - epsilon, y: minY - epsilon },
      v2: { x: maxX + epsilon, y: minY - epsilon },
      v3: { x: maxX + epsilon, y: maxY + epsilon },
      v4: { x: minX - epsilon, y: maxY + epsilon },
    };
  }

  public static combine(g1: IGBOX, g2: IGBOX): IGBOX {
    const minX = Math.min(g1.v1.x, g2.v1.x);
    const minY = Math.min(g1.v1.y, g2.v1.y);
    const maxX = Math.max(g1.v3.x, g2.v3.x);
    const maxY = Math.max(g1.v3.y, g2.v3.y);
    return {
      v1: { x: minX, y: minY },
      v2: { x: maxX, y: minY },
      v3: { x: maxX, y: maxY },
      v4: { x: minX, y: maxY },
    };
  }
}
