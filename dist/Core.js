"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dispatcher_1 = require("dispatcher");
/**
 * Core
 */
class Core extends dispatcher_1.Dispatcher {
    constructor(options = {}) {
        super();
        // Set options on class
        Object.assign(this, options);
    }
}
exports.default = Core;
