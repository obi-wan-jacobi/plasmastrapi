import Component from 'engine/abstracts/Component';

export interface IPoint { x: number; y: number }

export interface IPose extends IPoint { a: number }

export default class PoseComponent extends Component<IPose> { }
