import { Component } from '@plasmastrapi/ecs';

export interface IPhysical {
  mass: number;
}

export default class PhysicalComponent extends Component<IPhysical> {}
