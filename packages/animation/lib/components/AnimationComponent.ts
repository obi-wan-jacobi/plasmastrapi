import { IImage } from '../../../engine/lib/components/ImageComponent';
import { Component } from '@plasmastrapi/ecs';

export interface IAnimation {
  frame: number;
  images: IImage[];
  isPaused: boolean;
  isReversed: boolean;
  duration: number;
}

export default class AnimationComponent extends Component<IAnimation> {}
