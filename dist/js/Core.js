System.register(["dispatcher"], function (exports_1, context_1) {
    "use strict";
    var dispatcher_1, Core;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (dispatcher_1_1) {
                dispatcher_1 = dispatcher_1_1;
            }
        ],
        execute: function () {
            Core = class Core extends dispatcher_1.Dispatcher {
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
            };
            exports_1("default", Core);
        }
    };
});
//# sourceMappingURL=Core.js.map