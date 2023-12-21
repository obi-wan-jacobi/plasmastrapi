import { IShape } from '../components/ShapeComponent';

export default abstract class Rectangle {
  public static create(width: number, height: number): IShape {
    return {
      vertices: [
        { x: -width / 2, y: -height / 2 },
        { x: -width / 2, y: height / 2 },
        { x: width / 2, y: height / 2 },
        { x: width / 2, y: -height / 2 },
      ],
    };
  }
}
