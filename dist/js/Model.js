System.register(["./ActiveRecord"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var ActiveRecord_1, Model;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (ActiveRecord_1_1) {
                ActiveRecord_1 = ActiveRecord_1_1;
            }
        ],
        execute: function () {
            Model = class Model extends ActiveRecord_1.default {
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
                fetch(options = {}, queryParams = {}) {
                    const _super = Object.create(null, {
                        fetch: { get: () => super.fetch }
                    });
                    return __awaiter(this, void 0, void 0, function* () {
                        this.builder.identifier(options && options.id ? options.id : this.id);
                        if (!(options && options.id) && !this.id) {
                            console.warn('Fetching model without ID is likely incorrect behavior.', this, this.id, this.toJSON());
                        }
                        return yield _super.fetch.call(this, options, queryParams);
                    });
                }
                hasOne(relationshipName, relationshipClass) {
                    if (this.relationshipCache[relationshipName]) {
                        return this.relationshipCache[relationshipName];
                    }
                    var content = this.attr(relationshipName) || {};
                    var model = new relationshipClass(content);
                    return this.relationshipCache[relationshipName] = model;
                }
                hasMany(relationshipName, relationshipClass) {
                    if (this.relationshipCache[relationshipName]) {
                        return this.relationshipCache[relationshipName];
                    }
                    const content = this.attr(relationshipName) || { data: [] };
                    const collection = relationshipClass.hydrate(content.data || content);
                    return this.relationshipCache[relationshipName] = collection;
                }
                validate(attributes, options = {}) {
                    if (!this.validate || !options.validate) {
                        return true;
                    }
                    return false;
                }
            };
            exports_1("default", Model);
        }
    };
});
//# sourceMappingURL=Model.js.map