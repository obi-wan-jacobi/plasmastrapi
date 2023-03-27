import IEvent from './IEvent';

export default interface IKeyboardEvent extends IEvent {
  key: string;
  isCtrlDown: boolean;
  isShiftDown: boolean;
}
