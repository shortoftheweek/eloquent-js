import { Dispatcher } from 'dispatcher';
/**
 * Core
 */
export default class Core extends Dispatcher {
    constructor(options = {}) {
        super();
        // Set options on class
        Object.assign(this, options);
    }
}
//# sourceMappingURL=Core.js.map