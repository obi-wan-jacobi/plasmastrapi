import { Component } from '@plasmastrapi/ecs';
import { IPoint } from '@plasmastrapi/geometry';

export interface IImage {
  src: string;
  width?: number;
  height?: number;
  rotate?: number;
  crop?: IImageCrop;
  offset?: IPoint;
  zIndex: number;
}

export interface IImageCrop {
  sourceX: number;
  sourceY: number;
  sourceWidth: number;
  sourceHeight: number;
}

export default class ImageComponent extends Component<IImage> {}
