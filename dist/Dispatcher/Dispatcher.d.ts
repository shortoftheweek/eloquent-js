import DispatcherEvent from './DispatcherEvent';
export default class Dispatcher {
    events: Record<string, DispatcherEvent>;
    constructor();
    trigger(eventName: string, eventData?: Record<string, any>): void;
    dispatch(eventName: string, eventData?: Record<string, any>): void;
    on(eventName: string, callback: (eventData?: Record<string, unknown>) => void): void;
    off(eventName: string, callback?: () => void): void;
}
