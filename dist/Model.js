"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActiveRecord_1 = require("./ActiveRecord");
class Model extends ActiveRecord_1.default {
    constructor(attributes = {}, options = {}) {
        super(options);
        this.changed = {};
        this.fields = [];
        this.relationships = {};
        this.rules = [];
        this.validationError = null;
        this.dataKey = undefined;
        this.relationshipCache = {};
        this.changed = {};
        this.cid = this.cidPrefix + Math.random().toString(36).substr(2, 5);
        this.setHeader('Content-Type', 'application/json; charset=utf8');
        this.set(attributes);
    }
    static hydrate(attributes = {}, options = {}) {
        const collection = new this(options);
        collection.set(attributes);
        collection.options(options);
        return collection;
    }
    set(hash = {}) {
        super.set(hash, false);
        if (this.attributes.data && this.attributes.data.length) {
            console.warn('This model is incorrectly getting collection data.', this);
        }
        let key;
        for (key in hash) {
            if (this.relationshipCache[key]) {
                this.relationshipCache[key].set(hash[key]);
            }
        }
        this.dispatch('set');
        return this;
    }
    async fetch(options = {}, queryParams = {}) {
        this.builder.identifier(options && options.id ? options.id : this.id);
        if (!(options && options.id) && !this.id) {
            console.warn('Fetching model without ID is likely incorrect behavior.', this, this.id, this.toJSON());
        }
        return await super.fetch(options, queryParams);
    }
    hasOne(relationshipName, relationshipClass) {
        if (this.relationshipCache[relationshipName]) {
            return this.relationshipCache[relationshipName];
        }
        var content = this.attr(relationshipName) || {};
        var model = new relationshipClass(content);
        model.parent = this;
        model.useModifiedEndpoint(this);
        return (this.relationshipCache[relationshipName] = model);
    }
    hasMany(relationshipName, relationshipClass) {
        if (this.relationshipCache[relationshipName]) {
            return this.relationshipCache[relationshipName];
        }
        const content = this.attr(relationshipName) || { data: [] };
        const collection = relationshipClass.hydrate(content.data || content);
        collection.parent = this;
        collection.useModifiedEndpoint(this);
        return (this.relationshipCache[relationshipName] = collection);
    }
    validate(attributes, options = {}) {
        if (!this.validate || !options.validate) {
            return true;
        }
        return false;
    }
}
exports.default = Model;
//# sourceMappingURL=Model.js.map