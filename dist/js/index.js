System.register(["./ActiveRecord", "./Collection", "./Model", "./Http/Request"], function (exports_1, context_1) {
    "use strict";
    var ActiveRecord_1, Collection_1, Model_1, Request_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (ActiveRecord_1_1) {
                ActiveRecord_1 = ActiveRecord_1_1;
            },
            function (Collection_1_1) {
                Collection_1 = Collection_1_1;
            },
            function (Model_1_1) {
                Model_1 = Model_1_1;
            },
            function (Request_1_1) {
                Request_1 = Request_1_1;
            }
        ],
        execute: function () {
            exports_1("ActiveRecord", ActiveRecord_1.default);
            exports_1("Collection", Collection_1.default);
            exports_1("Model", Model_1.default);
            exports_1("Request", Request_1.default);
        }
    };
});
//# sourceMappingURL=index.js.map