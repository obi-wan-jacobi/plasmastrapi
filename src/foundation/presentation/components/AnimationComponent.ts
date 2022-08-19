import Component from 'engine/abstracts/Component';
import { IImage } from './ImageComponent';

export interface IAnimation {
  frame: number;
  images: IImage[];
  isPaused: boolean;
  isReversed: boolean;
  duration: number;
}

export default class AnimationComponent extends Component<IAnimation> { }
