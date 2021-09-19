/**
 *
 */
 export default class DispatcherEvent 
 {
    /**
     * Callbacks
     *
     * @type {any}
     */
    callbacks: ((eventData?: Record<string, unknown>) => void)[];

    /**
     * Data passed come from constructor
     */
    eventData: Record<string, unknown>;

    /**
     * Event Name
     *
     * @type {string}
     */
    eventName: string;

    /**
     * Constructor
     */
    constructor(eventName: string, eventData: Record<string, unknown> = {}) {
        // super(eventName, eventData);

        this.callbacks = [];
        this.eventData = eventData;
        this.eventName = eventName;
    }

    /**
     * Remove all callbacks
     */
    clearCallbacks(): void {
        this.callbacks = [];
    }

    /**
     * Register Callback
     *
     * @param {any) => void} callback [description]
     */
    registerCallback(callback: (eventData?: Record<string, unknown>) => void): void {
        this.callbacks.push(callback);
    }

    /**
     * Unregister Callback
     *
     * @param {any) => void} callback [description]
     */
    unregisterCallback(callback: (eventData?: Record<string, unknown>) => void): void {
        const index = this.callbacks.indexOf(callback);

        if (index > -1) {
            this.callbacks.splice(index, 1);
        }
    }

    /**
     * Fire
     *
     * @param {any} data [description]
     */
    fire(eventData: Record<string, unknown>): void {
        const callbacks = this.callbacks.slice(0);

        callbacks.forEach((callback: (eventData?: Record<string, unknown>) => void) => {
            callback(Object.assign({}, this.eventData, eventData));
        });
    }
}
