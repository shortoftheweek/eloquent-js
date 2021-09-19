"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DispatcherEvent_1 = require("./DispatcherEvent");
class Dispatcher {
    constructor() {
        this.events = {};
    }
    trigger(eventName, data = {}) {
        return this.dispatch(eventName, data);
    }
    dispatch(eventName, data = {}) {
        var _a;
        const event = this.events[eventName];
        const d = eventName === ((_a = data.event) === null || _a === void 0 ? void 0 : _a.name) ? data.data : data;
        if (event) {
            event.fire({
                data: d,
                event: {
                    name: eventName,
                },
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