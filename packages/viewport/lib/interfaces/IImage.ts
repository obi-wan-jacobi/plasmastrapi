import { IPoint } from '@plasmastrapi/geometry';
import { IImageCrop } from './IImageCrop';

export interface IImage {
  src: string;
  width?: number;
  height?: number;
  rotate?: number;
  crop?: IImageCrop;
  offset?: IPoint;
  zIndex: number;
}
