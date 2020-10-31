"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let CollectionIterator = (() => {
    class CollectionIterator {
        constructor(collection, kind = 0) {
            this.index = 0;
            this.kind = CollectionIterator.ITERATOR_VALUES;
            this.collection = collection;
            this.kind = kind;
            this.index = 0;
        }
        next() {
            if (this.collection) {
                if (this.index < this.collection.length) {
                    const model = this.collection.at(this.index);
                    this.index++;
                    let value;
                    if (this.kind === CollectionIterator.ITERATOR_VALUES) {
                        value = model;
                    }
                    else {
                        var id = this.collection.modelId;
                        if (this.kind === CollectionIterator.ITERATOR_KEYS) {
                            value = id;
                        }
                        else {
                            value = [id, model];
                        }
                    }
                    return {
                        value: value,
                        done: false,
                    };
                }
                this.collection = void 0;
            }
            return {
                value: void 0,
                done: true,
            };
        }
    }
    CollectionIterator.ITERATOR_VALUES = 0;
    CollectionIterator.ITERATOR_KEYS = 1;
    CollectionIterator.ITERATOR_KEYSVALUES = 2;
    return CollectionIterator;
})();
exports.default = CollectionIterator;
//# sourceMappingURL=CollectionIterator.js.map