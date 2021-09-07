/**
 *
 */
 export default class DispatcherEvent {
    /**
     * Callbacks
     *
     * @type {any}
     */
    callbacks: ((data?: Record<string, unknown>) => void)[];

    /**
     * Data passed come from constructor
     */
    data: Record<string, unknown>;

    /**
     * Event Name
     *
     * @type {string}
     */
    eventName: string;

    /**
     * Constructor
     */
    constructor(eventName: string, data: Record<string, unknown> = {}) {
        // super(eventName, data);

        this.callbacks = [];
        this.data = data;
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
    registerCallback(callback: (data?: Record<string, unknown>) => void): void {
        this.callbacks.push(callback);
    }

    /**
     * Unregister Callback
     *
     * @param {any) => void} callback [description]
     */
    unregisterCallback(callback: (data?: Record<string, unknown>) => void): void {
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
    fire(data: Record<string, unknown>): void {
        const callbacks = this.callbacks.slice(0);

        callbacks.forEach((callback: (data?: Record<string, unknown>) => void) => {
            callback(Object.assign({}, this.data, data));
        });
    }
}
