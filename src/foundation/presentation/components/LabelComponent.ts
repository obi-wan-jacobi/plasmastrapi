import Component from 'engine/abstracts/Component';

export interface ILabel {
  text: string;
  fontSize: number;
  offset: { x: number; y: number };
}

export default class LabelComponent extends Component<ILabel> { }