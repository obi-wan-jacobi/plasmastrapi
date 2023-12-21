import {
  INormalizedVector,
  IPoint,
  IVector,
  Shape,
  Vector,
  GeoJSON,
  booleanPointOnLine,
  Edge,
  IShape,
  PoseComponent,
  ShapeComponent,
} from '@plasmastrapi/geometry';
import LevelComponent from '../components/LevelComponent';

export function getLevelShape(levelComponent: LevelComponent): IShape {
  const level = levelComponent.$entity;
  const levelPose = level.$copy(PoseComponent);
  return Shape.transform(level.$copy(ShapeComponent), levelPose);
}

export function getIntersectingEdgeOfLevel(levelComponent: LevelComponent, intersection: IPoint): Edge {
  const vertices = getLevelShape(levelComponent).vertices;
  vertices.unshift(vertices[vertices.length - 1]);
  for (let i = 0, L = vertices.length; i < L - 1; i++) {
    const v1 = vertices[i];
    const v2 = vertices[i + 1];
    const edge = GeoJSON.createFromPoints([v1, v2]);
    const { x, y } = intersection;
    if (booleanPointOnLine([x, y], edge, { epsilon: 0.1 })) {
      return [v1, v2];
    }
  }
  throw new Error(`Point (${intersection.x}, ${intersection.y}) does not lie on any edges in given ${LevelComponent.name}.`);
}

export function levelGetResultantVelocityAfterCollision({
  levelComponent,
  pointOfCollision,
  velocityVector,
  cFriction,
  cRestitution,
}: {
  levelComponent: LevelComponent;
  pointOfCollision: IPoint;
  velocityVector: INormalizedVector;
  cFriction: number;
  cRestitution: number;
}): IVector {
  const edge = getIntersectingEdgeOfLevel(levelComponent, pointOfCollision);
  const uEdgeVector = Vector.normalizeFromPoints(edge[0], edge[1]).direction;
  const n = Vector.normalize({ x: uEdgeVector.y, y: -uEdgeVector.x });
  const u = Vector.projectAOntoB(velocityVector, n);
  const w = Vector.subtractAfromB(u, velocityVector);
  // v = cF*w - cR*u
  return Vector.expand(Vector.subtractAfromB(Vector.multiply(u, cRestitution), Vector.multiply(w, cFriction)));
}
