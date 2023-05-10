import { IEntity, PoseComponent, ShapeComponent } from '@plasmastrapi/ecs';
import {
  IPoint,
  IPose,
  Shape,
  booleanContains,
  booleanOverlap,
  booleanPointInPolygon,
  lineIntersect,
  turf,
  GeoJSON,
} from '@plasmastrapi/geometry';

export const entityContainsPoint = (entity: IEntity, point: IPoint, options?: {}): boolean => {
  const shape = Shape.transform(entity.$copy(ShapeComponent), entityGetAbsolutePose(entity));
  return booleanPointInPolygon(turf.point([point.x, point.y]), GeoJSON.createFromShape(shape), options);
};

export const entitiesTouch = (entity1: IEntity, entity2: IEntity): boolean => {
  const shape1 = Shape.transform(entity1.$copy(ShapeComponent), entityGetAbsolutePose(entity1));
  const shape2 = Shape.transform(entity2.$copy(ShapeComponent), entityGetAbsolutePose(entity2));
  const geoJSON1 = GeoJSON.createFromShape(shape1);
  const geoJSON2 = GeoJSON.createFromShape(shape2);
  return (
    booleanContains(geoJSON1, geoJSON2) ||
    booleanContains(geoJSON2, geoJSON1) ||
    booleanOverlap(geoJSON1, geoJSON2) ||
    booleanOverlap(geoJSON2, geoJSON1)
  );
};

export const entityContainsEntity = (entity1: IEntity, entity2: IEntity): boolean => {
  const shape1 = Shape.transform(entity1.$copy(ShapeComponent), entityGetAbsolutePose(entity1));
  const shape2 = Shape.transform(entity2.$copy(ShapeComponent), entityGetAbsolutePose(entity2));
  const geoJSON1 = GeoJSON.createFromShape(shape1);
  const geoJSON2 = GeoJSON.createFromShape(shape2);
  return booleanContains(geoJSON1, geoJSON2) || booleanContains(geoJSON2, geoJSON1);
};

export const entityTouchesLine = (entity: IEntity, points: IPoint[]): boolean => {
  const shape = Shape.transform(entity.$copy(ShapeComponent), entityGetAbsolutePose(entity));
  const polygon = GeoJSON.createFromShape(shape);
  const line = GeoJSON.createFromPoints(points);
  return lineIntersect(polygon, line).features.length > 0;
};

export const entityGetAbsolutePose = (entity: IEntity): IPose => {
  const pose = entity.$copy(PoseComponent);
  let target = entity.$parent;
  while (target) {
    const parentPose = target.$copy(PoseComponent) || { x: 0, y: 0, a: 0 };
    pose.x += parentPose.x;
    pose.y += parentPose.y;
    pose.a += parentPose.a;
    target = target.$parent;
  }
  return pose;
};
