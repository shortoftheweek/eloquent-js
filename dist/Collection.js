"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CollectionIterator_1 = require("./CollectionIterator");
const ActiveRecord_1 = require("./ActiveRecord");
const Model_1 = require("./Model");
const _ = require("lodash");
class Collection extends ActiveRecord_1.default {
    constructor(options = {}) {
        super(options);
        this.meta = {
            pagination: {
                total: 0,
                count: 15,
                per_page: 15,
                current_page: 1,
                total_pages: 1,
                links: {},
            },
        };
        this.model = Model_1.default;
        this.models = [];
        this.dataKey = 'data';
        this.sortKey = 'id';
        this.setHeader('Content-Type', 'application/json; charset=utf8');
        this.cid = this.cidPrefix + Math.random()
            .toString(36)
            .substr(2, 5);
    }
    static hydrate(models = [], options = {}) {
        const collection = new this(options);
        collection.add(models);
        collection.options(options);
        return collection;
    }
    get length() {
        return this.models.length;
    }
    get modelId() {
        return 'id';
    }
    get pagination() {
        return this.meta.pagination;
    }
    toJSON() {
        return JSON.parse(JSON.stringify(this.models));
    }
    sync() {
    }
    add(model, options = {}) {
        if (model == undefined) {
            return this;
        }
        const models = Array.isArray(model)
            ? model
            : [model];
        models.forEach((model) => {
            if (!(model instanceof Model_1.default)) {
                model = new this.model(model);
            }
            if (options.prepend) {
                this.models.unshift(model);
            }
            else {
                this.models.push(model);
            }
        });
        this.dispatch('add');
        return this;
    }
    remove(model, options = {}) {
        let i = 0;
        let ii = 0;
        const items = Array.isArray(model)
            ? model
            : [model];
        for (ii = 0; ii < items.length; ii++) {
            i = 0;
            while (i < this.models.length) {
                if (this.models[i] == items[ii]) {
                    this.models.splice(i, 1);
                }
                else {
                    ++i;
                }
            }
        }
        this.dispatch('remove');
        return this;
    }
    set(model, options = {}) {
        this.reset();
        if (model && model.hasOwnProperty('meta')) {
            this.meta = model.meta;
        }
        if (model && model.hasOwnProperty('data')) {
            this.add(model.data);
        }
        else {
            this.add(model);
        }
        this.dispatch('set');
        return this;
    }
    reset() {
        this.models = [];
        this.dispatch('reset');
        return this;
    }
    clear() {
        return this.reset();
    }
    push(model, options = {}) {
        this.add(model, options);
        return this;
    }
    pop(options = {}) {
        const model = this.at(this.length - 1);
        return this.remove(model, options);
    }
    unshift(model, options = {}) {
        return this.add(model, Object.assign({ prepend: true }, options));
    }
    shift(options = {}) {
        const model = this.at(0);
        return this.remove(model, options);
    }
    slice(...params) {
        return Array.prototype.slice.apply(this.models, params);
    }
    get(query) {
        if (query == null) {
            return void 0;
        }
        return this.where({
            [this.modelId]: query instanceof Model_1.default
                ? query.cid
                : query,
        }, true);
    }
    has(obj) {
        return this.get(obj) != undefined;
    }
    at(index = 0) {
        if (index < 0) {
            index += this.length;
        }
        return this.models[index];
    }
    first() {
        return this.at(0);
    }
    last() {
        return this.at(this.length - 1);
    }
    where(attributes = {}, first = false) {
        const collection = new this.constructor();
        _.map(this.models, (model) => {
            if (_.find(model, attributes)) {
                collection.add(model);
            }
        });
        return first
            ? collection.first()
            : collection;
    }
    findWhere(attributes = {}) {
        return this.where(attributes, true);
    }
    findByCid(cid) {
        return _.find(this.models, { cid });
    }
    each(predicate) {
        return _.each(this.models, predicate);
    }
    filter(predicate) {
        return _.filter(this.models, predicate);
    }
    find(predicate) {
        return _.find(this.models, predicate);
    }
    sort(options = null) {
        let key = this.sortKey;
        if (options !== null) {
            key = options.key;
        }
        this.models = this.models.sort((a, b) => {
            return options && options.reverse
                ? (a.attr(key) - b.attr(key)) * -1
                : (a.attr(key) - b.attr(key)) * 1;
        });
        return this;
    }
    pluck(attribute) {
        return this.models.map(model => model.attr(attribute));
    }
    clone(attributes = {}) {
        const instance = new this.constructor();
        instance.add(this.toJSON());
        return instance;
    }
    values() {
        return new CollectionIterator_1.default(this, CollectionIterator_1.default.ITERATOR_VALUES);
    }
    keys(attributes = {}) {
        return new CollectionIterator_1.default(this, CollectionIterator_1.default.ITERATOR_KEYS);
    }
    entries(attributes = {}) {
        return new CollectionIterator_1.default(this, CollectionIterator_1.default.ITERATOR_KEYSVALUES);
    }
    _isModel(model) {
        return model instanceof Model_1.default;
    }
    [Symbol.iterator]() {
        return new CollectionIterator_1.default(this, CollectionIterator_1.default.ITERATOR_VALUES);
    }
}
exports.default = Collection;
//# sourceMappingURL=Collection.js.map