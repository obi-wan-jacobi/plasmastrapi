import { Component } from '@plasmastrapi/ecs';

export interface IImage {
  src: string;
  width?: number;
  height?: number;
  rotate?: number;
  zIndex: number;
}

export default class ImageComponent extends Component<IImage> {}
