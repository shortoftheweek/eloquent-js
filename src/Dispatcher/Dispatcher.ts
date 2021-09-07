import DispatcherEvent from './DispatcherEvent';

/**
 * Dispatcher
 */
export default class Dispatcher {
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
     * @param {string} eventName
     * @param {any = {}} data
     */
    trigger(eventName: string, data: Record<string, unknown> = {}):void {
        return this.dispatch(eventName, data);
    }

    /**
     * Dispatch
     *
     * @param {string} eventName [description]
     * @param {any =         {}}        data [description]
     */
    dispatch(eventName: string, data: Record<string, unknown> = {}): void {
        const event: DispatcherEvent = this.events[eventName] as DispatcherEvent;

        if (event) {
            event.fire({
                data: data,
                event: {
                    name: eventName,
                },
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
    on(eventName: string, callback: (data?: Record<string, unknown>) => void): void {
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
     * @param {string}  eventName [description]
     * @param {any) =>        void}        callback [description]
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
