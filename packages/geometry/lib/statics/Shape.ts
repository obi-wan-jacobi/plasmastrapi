import { EDGE_TYPE } from '../enums/EDGE_TYPE';
import IEdgesIntersection from '../interfaces/IEdgesIntersection';
import IFindEdgesIntersectionOptions from '../interfaces/IFindEdgesIntersectionOptions';
import { IPoint } from '../interfaces/IPoint';
import Point from './Point';
import * as geojson from 'geojson';
import { Vector } from './Vector';
import { lineIntersect } from '../helpers/turf';
import GeoJSON from './GeoJSON';
import { IShape } from '../components/ShapeComponent';
import { IPose } from '../components/PoseComponent';
import { Epsilon } from '@plasmastrapi/math';

export default abstract class Shape {
  public static transform(shape: IShape, pose: IPose): IShape {
    return {
      vertices: shape.vertices.map((p) => {
        const point = Point.rotateAboutOrigin(p, pose.a);
        return {
          x: point.x + pose.x,
          y: point.y + pose.y,
        };
      }),
    };
  }

  public static createFromGeoJSON(
    geoJSON: geojson.Feature<geojson.Polygon | geojson.MultiPolygon, geojson.GeoJsonProperties>,
  ): IShape[] {
    if (geoJSON.geometry.type === 'Polygon') {
      const shapes = geoJSON.geometry.coordinates.map((vertices: number[][]) => {
        return { vertices: vertices.map((vertex: number[]) => ({ x: vertex[0], y: vertex[1] })) };
      });
      return shapes;
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
  }

  public static createFromEdges(edges: Edge[]): IShape {
    const vertices: IPoint[] = [];
    for (const edge of edges) {
      vertices.push(edge[0]);
    }
    return { vertices };
  }

  public static toEdges(shape: IShape): Edge[] {
    const L = shape.vertices.length;
    return shape.vertices.map((v: IPoint, i: number) => [v, shape.vertices[(i + 1) % L]]);
  }

  public static findEdgeIntersection(
    start: IPoint,
    end: IPoint,
    edges: Edge[],
    options: IFindEdgesIntersectionOptions = { epsilon: Epsilon.default, isIncludeStart: false, isIncludeEnd: false },
  ): IEdgesIntersection | undefined {
    const intersections = Shape.findAllEdgeIntersections(start, end, edges, options);
    return intersections.length ? intersections[0] : undefined;
  }

  public static findAllEdgeIntersections(
    start: IPoint,
    end: IPoint,
    edges: Edge[],
    options: IFindEdgesIntersectionOptions = { epsilon: Epsilon.default, isIncludeStart: false, isIncludeEnd: false },
  ): IEdgesIntersection[] {
    options = Object.assign({ epsilon: Epsilon.default, isIncludeStart: false, isIncludeEnd: false }, options);
    return edges
      .map((edge, idx) => {
        let from = edge[0];
        let to = edge[1];
        const u = Vector.normalizeFromPoints(from, to);
        from = { x: from.x - u.direction.x * options.epsilon!, y: from.y - u.direction.y * options.epsilon! };
        to = { x: to.x + u.direction.x * options.epsilon!, y: to.y + u.direction.y * options.epsilon! };
        const v = Vector.normalizeFromPoints(start, end);
        const adjustedStart = { x: start.x - v.direction.x * options.epsilon!, y: start.y - v.direction.y * options.epsilon! };
        const adjustedEnd = { x: end.x + v.direction.x * options.epsilon!, y: end.y + v.direction.y * options.epsilon! };
        return [lineIntersect(GeoJSON.createFromPoints([adjustedStart, adjustedEnd]), GeoJSON.createFromPoints([from, to])), idx];
      })
      .filter(([intersection]) => {
        let isValidIntersection = intersection.features.length > 0;
        if (isValidIntersection) {
          const [x, y] = intersection.features[0].geometry.coordinates;
          if (options && options.isIncludeStart === false) {
            isValidIntersection =
              isValidIntersection && !(Math.abs(start.x - x) <= options.epsilon! && Math.abs(start.y - y) <= options.epsilon!);
          }
          if (options && options.isIncludeEnd === false) {
            isValidIntersection =
              isValidIntersection && !(Math.abs(end.x - x) <= options.epsilon! && Math.abs(end.y - y) <= options.epsilon!);
          }
        }
        return isValidIntersection;
      })
      .map(([intersection, idx]) => {
        const [x, y] = intersection.features[0].geometry.coordinates;
        return [{ x, y }, idx];
      })
      .sort(([{ x: x1, y: y1 }], [{ x: x2, y: y2 }]) => {
        return (
          Point.getEuclideanDistanceBetweenPoints(start, { x: x1, y: y1 }) -
          Point.getEuclideanDistanceBetweenPoints(start, { x: x2, y: y2 })
        );
      })
      .map(([intersection, idx]) => ({
        point: intersection,
        index: idx,
        distance: Point.getEuclideanDistanceBetweenPoints(start, intersection),
      }));
  }

  public static findEdgeWithVertex(vertex: IPoint, edges: Edge[], epsilon = Epsilon.default): number {
    return edges.findIndex((edge) => {
      return (
        (Math.abs(vertex.x - edge[0].x) <= epsilon && Math.abs(vertex.y - edge[0].y) <= epsilon) ||
        (Math.abs(vertex.x - edge[1].x) <= epsilon && Math.abs(vertex.y - edge[1].y) <= epsilon)
      );
    });
  }

  public static findNextEdge(start: IPoint, edges: Edge[], epsilon = Epsilon.default): number {
    return edges.findIndex((edge) => {
      return Math.abs(start.x - edge[0].x) <= epsilon && Math.abs(start.y - edge[0].y) <= epsilon;
    });
  }
}

export type Edge = [IPoint, IPoint, EDGE_TYPE?];
