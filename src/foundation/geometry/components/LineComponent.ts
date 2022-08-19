import Component from 'engine/abstracts/Component';
import { IPoint } from './PoseComponent';

export interface ILine {
  path: Array<IPoint>;
}

export default class LineComponent extends Component<ILine> {}