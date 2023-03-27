import IEvent from './IEvent';

export default interface IMouseEvent extends IEvent {
  x: number;
  y: number;
  isCtrlDown: boolean;
  isShiftDown: boolean;
}
