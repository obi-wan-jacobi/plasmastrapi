import { IPoint } from './PoseComponent';
import Component from 'engine/abstracts/Component';

export interface IShape { vertices: IPoint[] }
export default class ShapeComponent extends Component<IShape> { }
