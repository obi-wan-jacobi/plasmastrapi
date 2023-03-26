import { IPoint } from './PoseComponent';
import { Component } from '@plasmastrapi/ecs';

export interface IShape {
  vertices: IPoint[];
}
export default class ShapeComponent extends Component<IShape> {}
