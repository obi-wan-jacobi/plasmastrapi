import { IPoint } from './interfaces/IPoint';
import { IShape } from './interfaces/IShape';
import { IPose } from './interfaces/IPose';

import * as geojson from 'geojson';
import * as turf from '@turf/helpers';
import area from '@turf/area';
import bbox from '@turf/bbox';
import difference from '@turf/difference';
import kinks from '@turf/kinks';
import simplify from '@turf/simplify';
import unkinkPolygon from '@turf/unkink-polygon';

export { turf, geojson, area, bbox, difference, kinks, simplify, unkinkPolygon };

export const booleanContains = require('@turf/boolean-contains').default;
export const booleanOverlap = require('@turf/boolean-overlap').default;
export const booleanPointInPolygon = require('@turf/boolean-point-in-polygon').default;
export const booleanPointOnLine = require('@turf/boolean-point-on-line').default;
export const centerOfMass = require('@turf/center-of-mass').default;
export const lineIntersect = require('@turf/line-intersect').default;

export const rotatePointAboutOrigin = ({ point, orientation }: { point: IPoint; orientation: number }): IPoint => {
  const s = Math.sin(orientation);
  const c = Math.cos(orientation);
  return {
    x: point.x * c - point.y * s,
    y: point.x * s + point.y * c,
  };
};

export const transformShape = (shape: IShape, pose: IPose): IShape => {
  return {
    vertices: shape.vertices.map((p) => {
      const point = rotatePointAboutOrigin({ point: p, orientation: pose.a });
      return {
        x: point.x + pose.x,
        y: point.y + pose.y,
      };
    }),
  };
};

export const fromPointsToGeoJSON = (points: IPoint[]): geojson.Feature<geojson.LineString, geojson.GeoJsonProperties> => {
  return turf.lineString(points.map((point) => [point.x, point.y]));
};

export const fromShapeToGeoJSON = (shape: IShape): geojson.Feature<geojson.Polygon, geojson.GeoJsonProperties> => {
  return turf.polygon([
    shape.vertices.map((vertex) => [vertex.x, vertex.y]).concat([[shape.vertices[0].x, shape.vertices[0].y]]),
  ]);
};

export const fromGeoJSONCoordinatesToShapes = (
  geoJSON: geojson.Feature<geojson.Polygon | geojson.MultiPolygon, geojson.GeoJsonProperties>,
): IShape[] => {
  if (!geoJSON) {
    return [];
  }
  if (geoJSON.geometry.type === 'Polygon') {
    return geoJSON.geometry.coordinates.map((vertices: number[][]) => {
      return { vertices: vertices.map((vertex: number[]) => ({ x: vertex[0], y: vertex[1] })) };
    });
  }
  if (geoJSON.geometry.type === 'MultiPolygon') {
    const shapes: IShape[] = [];
    geoJSON.geometry.coordinates.forEach((polygon) => {
      shapes.push(
        polygon.map((vertices: number[][]) => {
          return { vertices: vertices.map((vertex: number[]) => ({ x: vertex[0], y: vertex[1] })) };
        })[0],
      );
    });
    return shapes;
  }
  return [];
};

export interface IBoundary {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}
export const fromShapeToBoundary = (shape: IShape): IBoundary => {
  const geojson = fromShapeToGeoJSON(shape);
  const bb = bbox(geojson);
  return {
    minX: bb[0],
    minY: bb[1],
    maxX: bb[2],
    maxY: bb[3],
  };
};

export const getEuclideanDistanceBetweenPoints = (p1: IPoint, p2: IPoint): number => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

export const getAngleBetweenPoints = (p1: IPoint, p2: IPoint): number => {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
};

export const getDirectionVectorAB = (a: IPoint, b: IPoint): { x: number; y: number } => {
  const v = {
    x: b.x - a.x,
    y: b.y - a.y,
  };
  const magnitude = getEuclideanDistanceBetweenPoints(b, a);
  return {
    x: v.x / magnitude,
    y: v.y / magnitude,
  };
};
