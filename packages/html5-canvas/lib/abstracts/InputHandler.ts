import IInputHandler from '../interfaces/IInputHandler';

export default abstract class InputHandler implements IInputHandler {
  [key: string]: any;
  public abstract init(args?: {}): void;
  public abstract dispose(): void;
  /* Ex.
  [KEYBOARD_EVENT.KEY_DOWN](event: IKeyboardEvent): void
  */
}
