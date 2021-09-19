import DispatcherEvent from './DispatcherEvent';

/**
 * Dispatcher
 */
export default class Dispatcher 
{
    /**
     * Events
     *
     * @type {any}
     */
    events: Record<string, DispatcherEvent>;

    /**
     * Constructor
     */
    constructor() {
        this.events = {};
    }

    /**
     * Alias for dispatch
     *
     * @param string eventName
     * @param any eventData
     */
    trigger(eventName: string, eventData: Record<string, any> = {}): void {
        return this.dispatch(eventName, eventData);
    }

    /**
     * Dispatch
     * 
     * If duplicate event is passed, will attempt to bubble it.
     *
     * @param string eventName
     * @param any eventData
     */
    dispatch(eventName: string, eventData: Record<string, any> = {}): void {
        const event: DispatcherEvent = this.events[eventName] as DispatcherEvent;
        const d: any = eventName === eventData.event?.name && eventData.eventData
            ? eventData.eventData
            : eventData;

        if (event) {
            event.fire({
                event: {
                    name: eventName,
                },
                eventData: d,
                target: this,
            });
        }
    }

    /**
     * On
     *
     * @param {string}  eventName [description]
     * @param {any) => void}  callback [description]
     */
    on(eventName: string, callback: (eventData?: Record<string, unknown>) => void): void {
        let event = this.events[eventName];

        if (!event) {
            event = new DispatcherEvent(eventName);
            this.events[eventName] = event;
        }

        event.registerCallback(callback);
    }

    /**
     * Off
     *
     * @param string eventName
     * @param any callback
     */
    off(eventName: string, callback?: () => void): void {
        const event: DispatcherEvent = this.events[eventName] as DispatcherEvent;

        // Clear all
        if (event && !callback) {
            event.clearCallbacks();
            delete this.events[eventName];
        }

        // Remove specific
        else if (event && callback && event.callbacks.indexOf(callback) > -1) {
            event.unregisterCallback(callback);

            if (event.callbacks.length === 0) {
                delete this.events[eventName];
            }
        }
    }
}
