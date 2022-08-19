import IPipeEvent from 'engine/interfaces/IPipeEvent';
import IPipe from 'engine/interfaces/IPipe';
import clone from 'base/helpers/clone';
import { Volatile } from 'base/types';

export default class Pipe<TEvent extends IPipeEvent> implements IPipe<TEvent> {

    private __event?: TEvent;
    protected _buffer: TEvent[] = [];

    public get event(): Volatile<TEvent> {
        if (!this.__event) {
            return undefined;
        }
        return clone(this.__event);
    }

    public next(): void {
        this.__event = this._buffer.shift();
    }

    public push(event: TEvent): void {
        this._buffer.push(event);
    }

}