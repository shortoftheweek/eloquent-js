"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DispatcherEvent_1 = require("./DispatcherEvent");
class Dispatcher {
    constructor() {
        this.events = {};
    }
    trigger(eventName, eventData = {}) {
        return this.dispatch(eventName, eventData);
    }
    dispatch(eventName, eventData = {}) {
        var _a;
        const event = this.events[eventName];
        const d = eventName === ((_a = eventData.event) === null || _a === void 0 ? void 0 : _a.name) && eventData.eventData
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
    on(eventName, callback) {
        let event = this.events[eventName];
        if (!event) {
            event = new DispatcherEvent_1.default(eventName);
            this.events[eventName] = event;
        }
        event.registerCallback(callback);
    }
    off(eventName, callback) {
        const event = this.events[eventName];
        if (event && !callback) {
            event.clearCallbacks();
            delete this.events[eventName];
        }
        else if (event && callback && event.callbacks.indexOf(callback) > -1) {
            event.unregisterCallback(callback);
            if (event.callbacks.length === 0) {
                delete this.events[eventName];
            }
        }
    }
}
exports.default = Dispatcher;
//# sourceMappingURL=Dispatcher.js.map