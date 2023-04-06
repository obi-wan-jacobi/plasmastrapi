import { Component } from '@plasmastrapi/ecs';

export interface IStyle {
  colour: string;
  fill: string;
  opacity: number;
  zIndex: number;
}

export default class StyleComponent extends Component<IStyle> {}
