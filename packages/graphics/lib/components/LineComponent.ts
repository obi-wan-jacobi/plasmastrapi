import { Component } from '@plasmastrapi/ecs';
import { IPoint } from '@plasmastrapi/geometry';

export interface ILine {
  path: Array<IPoint>;
}

export default class LineComponent extends Component<ILine> {}
