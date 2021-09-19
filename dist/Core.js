"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dispatcher_1 = require("./Dispatcher/Dispatcher");
class Core extends Dispatcher_1.default {
    constructor(options = {}) {
        super();
        Object.assign(this, options);
    }
    trigger(eventName, eventData) {
        return super.trigger(eventName, eventData);
    }
    dispatch(eventName, eventData) {
        return super.dispatch(eventName, eventData);
    }
    on(eventName, callback) {
        return super.on(eventName, callback);
    }
    off(eventName, callback) {
        return super.off(eventName, callback);
    }
}
exports.default = Core;
Core.eloquentjsversion = '2.1.2';
//# sourceMappingURL=Core.js.map