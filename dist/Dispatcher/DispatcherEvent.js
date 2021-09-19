"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DispatcherEvent {
    constructor(eventName, eventData = {}) {
        this.callbacks = [];
        this.eventData = eventData;
        this.eventName = eventName;
    }
    clearCallbacks() {
        this.callbacks = [];
    }
    registerCallback(callback) {
        this.callbacks.push(callback);
    }
    unregisterCallback(callback) {
        const index = this.callbacks.indexOf(callback);
        if (index > -1) {
            this.callbacks.splice(index, 1);
        }
    }
    fire(eventData) {
        const callbacks = this.callbacks.slice(0);
        callbacks.forEach((callback) => {
            callback(Object.assign({}, this.eventData, eventData));
        });
    }
}
exports.default = DispatcherEvent;
//# sourceMappingURL=DispatcherEvent.js.map