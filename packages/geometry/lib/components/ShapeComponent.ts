import { Component } from '@plasmastrapi/ecs';
import { IPoint } from '../interfaces/IPoint';

export interface IShape {
  vertices: IPoint[];
}

export default class ShapeComponent extends Component<IShape> {}
