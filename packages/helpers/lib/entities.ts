import { IEntity, PoseComponent, ShapeComponent } from '@plasmastrapi/ecs';
import {
  IPoint,
  IPose,
  booleanContains,
  booleanOverlap,
  booleanPointInPolygon,
  fromPointsToGeoJSON,
  fromShapeToGeoJSON,
  lineIntersect,
  transformShape,
  turf,
} from '@plasmastrapi/geometry';

export const entityContainsPoint = (entity: IEntity, point: IPoint, options?: {}): boolean => {
  const shape = transformShape(entity.$copy(ShapeComponent), getAbsolutePose(entity));
  return booleanPointInPolygon(turf.point([point.x, point.y]), fromShapeToGeoJSON(shape), options);
};

export const entitiesTouch = (entity1: IEntity, entity2: IEntity): boolean => {
  const shape1 = transformShape(entity1.$copy(ShapeComponent), getAbsolutePose(entity1));
  const shape2 = transformShape(entity2.$copy(ShapeComponent), getAbsolutePose(entity2));
  const geoJSON1 = fromShapeToGeoJSON(shape1);
  const geoJSON2 = fromShapeToGeoJSON(shape2);
  return (
    booleanContains(geoJSON1, geoJSON2) ||
    booleanContains(geoJSON2, geoJSON1) ||
    booleanOverlap(geoJSON1, geoJSON2) ||
    booleanOverlap(geoJSON2, geoJSON1)
  );
};

export const entityContainsEntity = (entity1: IEntity, entity2: IEntity): boolean => {
  const shape1 = transformShape(entity1.$copy(ShapeComponent), getAbsolutePose(entity1));
  const shape2 = transformShape(entity2.$copy(ShapeComponent), getAbsolutePose(entity2));
  const geoJSON1 = fromShapeToGeoJSON(shape1);
  const geoJSON2 = fromShapeToGeoJSON(shape2);
  return booleanContains(geoJSON1, geoJSON2) || booleanContains(geoJSON2, geoJSON1);
};

export const entityTouchesLine = (entity: IEntity, points: IPoint[]): boolean => {
  const shape = transformShape(entity.$copy(ShapeComponent), getAbsolutePose(entity));
  const polygon = fromShapeToGeoJSON(shape);
  const line = fromPointsToGeoJSON(points);
  return lineIntersect(polygon, line).features.length > 0;
};

export const addWidthAndHeightAsShapeComponent = ({
  entity,
  width,
  height,
}: {
  entity: IEntity;
  width: number;
  height: number;
}): void => {
  entity.$add(ShapeComponent, {
    vertices: [
      { x: -width / 2, y: -height / 2 },
      { x: -width / 2, y: height / 2 },
      { x: width / 2, y: height / 2 },
      { x: width / 2, y: -height / 2 },
    ],
  });
};

export const getAbsolutePose = (entity: IEntity): IPose => {
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
