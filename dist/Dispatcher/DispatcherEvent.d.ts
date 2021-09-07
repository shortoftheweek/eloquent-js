export default class DispatcherEvent {
    callbacks: ((data?: Record<string, unknown>) => void)[];
    data: Record<string, unknown>;
    eventName: string;
    constructor(eventName: string, data?: Record<string, unknown>);
    clearCallbacks(): void;
    registerCallback(callback: (data?: Record<string, unknown>) => void): void;
    unregisterCallback(callback: (data?: Record<string, unknown>) => void): void;
    fire(data: Record<string, unknown>): void;
}
