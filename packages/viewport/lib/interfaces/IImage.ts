import { IImageCrop } from './IImageCrop';
import IRenderingPoint from './IRenderingPoint';

export interface IImage {
  src: string;
  width?: number;
  height?: number;
  rotate?: number;
  crop?: IImageCrop;
  offset?: IRenderingPoint;
  zIndex: number;
}
