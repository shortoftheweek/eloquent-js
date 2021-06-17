import { Dispatcher } from 'dispatcher';
export default class Core extends Dispatcher {
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
//# sourceMappingURL=Core.js.map