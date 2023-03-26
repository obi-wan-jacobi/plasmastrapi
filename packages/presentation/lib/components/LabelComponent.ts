import { Component } from '@plasmastrapi/ecs';

export interface ILabel {
  text: string;
  fontSize: number;
  offset: { x: number; y: number };
}

export default class LabelComponent extends Component<ILabel> {}
