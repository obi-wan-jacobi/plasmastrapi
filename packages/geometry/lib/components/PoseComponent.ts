import { Component } from '@plasmastrapi/ecs';
import { IPoint } from '../interfaces/IPoint';

export interface IPose extends IPoint {
  a: number;
  $?: {
    previous: IPoint & {
      a: number;
    };
  };
}

export default class PoseComponent extends Component<IPose> {}
