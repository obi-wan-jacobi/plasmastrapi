import { Component } from '@plasmastrapi/ecs';

export interface IVelocity {
  x: number;
  y: number;
  w: number;
}
export default class VelocityComponent extends Component<IVelocity> {}
