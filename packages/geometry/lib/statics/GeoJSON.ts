import * as geojson from 'geojson';
import * as turf from '@turf/helpers';
import { IPoint } from '../interfaces/IPoint';
import { IShape } from '../components/ShapeComponent';

export default abstract class GeoJSON {
  public static createFromPoints(points: IPoint[]): geojson.Feature<geojson.LineString, geojson.GeoJsonProperties> {
    return turf.lineString(points.map((point) => [point.x, point.y]));
  }

  public static createFromShape(shape: IShape): geojson.Feature<geojson.Polygon, geojson.GeoJsonProperties> {
    return turf.polygon([
      shape.vertices.map((vertex) => [vertex.x, vertex.y]).concat([[shape.vertices[0].x, shape.vertices[0].y]]),
    ]);
  }
}
