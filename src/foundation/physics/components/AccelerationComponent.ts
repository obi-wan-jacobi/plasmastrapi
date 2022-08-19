import Component from 'engine/abstracts/Component';

export interface IAcceleration {
  x: number; y: number; w: number;
}
export default class AccelerationComponent extends Component<IAcceleration> { }
