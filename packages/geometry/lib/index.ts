// <autogen>
import LineComponent, { ILine } from './components/LineComponent';
import PoseComponent, { IPoint, IPose } from './components/PoseComponent';
import ShapeComponent, { IShape } from './components/ShapeComponent';
import {
  entityContainsPoint,
  entitiesTouch,
  entityContainsEntity,
  entityTouchesLine,
  addWidthAndHeightAsShapeComponent,
  getAbsolutePose,
} from './entities';
import {
  rotatePointAboutOrigin,
  transformShape,
  fromPointsToGeoJSON,
  fromShapeToGeoJSON,
  fromGeoJSONCoordinatesToShapes,
  IBoundary,
  fromShapeToBoundary,
  getEuclideanDistanceBetweenPoints,
  getAngleBetweenPoints,
  getDirectionVectorAB,
} from './geometry';
export {
  LineComponent,
  ILine,
  PoseComponent,
  IPoint,
  IPose,
  ShapeComponent,
  IShape,
  entityContainsPoint,
  entitiesTouch,
  entityContainsEntity,
  entityTouchesLine,
  addWidthAndHeightAsShapeComponent,
  getAbsolutePose,
  rotatePointAboutOrigin,
  transformShape,
  fromPointsToGeoJSON,
  fromShapeToGeoJSON,
  fromGeoJSONCoordinatesToShapes,
  IBoundary,
  fromShapeToBoundary,
  getEuclideanDistanceBetweenPoints,
  getAngleBetweenPoints,
  getDirectionVectorAB,
};
// </autogen>
