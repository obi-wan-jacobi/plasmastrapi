import IPipeEvent from './IPipeEvent';

export default interface IPipe<TEvent extends IPipeEvent> {
    event?: TEvent;
    next(): void;
    push(event: TEvent): void;
}
