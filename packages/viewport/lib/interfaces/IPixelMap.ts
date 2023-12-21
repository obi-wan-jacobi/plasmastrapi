import IRenderingPoint from './IRenderingPoint';

export default interface IPixelMap {
  position: IRenderingPoint;
  pixels: string[];
  scalingFactor: number;
  isDirty: boolean;
}
