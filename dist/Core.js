"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dispatcher_1 = require("dispatcher");
class Core extends dispatcher_1.Dispatcher {
    constructor(options = {}) {
        super();
        Object.assign(this, options);
    }
    trigger(eventName, data) {
        return super.trigger(eventName, data);
    }
    dispatch(eventName, data) {
        return super.dispatch(eventName, data);
    }
    on(eventName, callback) {
        return super.on(eventName, callback);
    }
    off(eventName, callback) {
        return super.off(eventName, callback);
    }
}
exports.default = Core;
//# sourceMappingURL=Core.js.map