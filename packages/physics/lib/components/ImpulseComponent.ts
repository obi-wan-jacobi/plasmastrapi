import { Component } from '@plasmastrapi/ecs';

export interface IImpulse {
  x: number;
  y: number;
}

export default class ImpulseComponent extends Component<IImpulse> {}
