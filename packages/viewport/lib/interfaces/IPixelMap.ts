import { IPoint } from '@plasmastrapi/geometry';

export default interface IPixelMap {
  position: IPoint;
  pixels: string[];
  scalingFactor: number;
  isDirty: boolean;
}
