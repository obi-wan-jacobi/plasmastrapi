import { Component } from '@plasmastrapi/ecs';

export interface IPhysical {
  mass: number;
  invMass: number;
  I: number;
  invI: number;
}

export default class PhysicalComponent extends Component<IPhysical> {}
