import { Component } from '@plasmastrapi/ecs';

export interface IPoint {
  x: number;
  y: number;
}

export interface IPose extends IPoint {
  a: number;
}

export default class PoseComponent extends Component<IPose> {}
