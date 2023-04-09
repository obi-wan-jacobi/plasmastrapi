import { Component } from '@plasmastrapi/ecs';

export interface IAcceleration {
  x: number;
  y: number;
  w: number;
}
export default class AccelerationComponent extends Component<IAcceleration> {}
