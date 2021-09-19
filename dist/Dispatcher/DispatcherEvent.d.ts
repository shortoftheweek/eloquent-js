export default class DispatcherEvent {
    callbacks: ((eventData?: Record<string, unknown>) => void)[];
    eventData: Record<string, unknown>;
    eventName: string;
    constructor(eventName: string, eventData?: Record<string, unknown>);
    clearCallbacks(): void;
    registerCallback(callback: (eventData?: Record<string, unknown>) => void): void;
    unregisterCallback(callback: (eventData?: Record<string, unknown>) => void): void;
    fire(eventData: Record<string, unknown>): void;
}
