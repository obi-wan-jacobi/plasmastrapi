import { Void } from '@plasmastrapi/base';
import IEvent from './IEvent';

export default interface IHTML5EventTransform<TElement extends HTMLElement, TSourceEvent extends Event, TAdaptedEvent extends IEvent> {
  element: TElement;
  eventNames: string[];
  eventMapper: ({ event, element }: { event: TSourceEvent; element: TElement }) => TAdaptedEvent;
  callback: Void<TAdaptedEvent>;
}
