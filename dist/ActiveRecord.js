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
Object.defineProperty(exports, "__esModule", { value: true });
const Builder_1 = require("./Builder");
const Core_1 = require("./Core");
const Request_1 = require("./Http/Request");
/**
 * ActiveRecord
 *
 * @type {[type]}
 */
class ActiveRecord extends Core_1.default {
    /**
     * Constructor
     */
    constructor(options = {}) {
        super(options);
        /**
         * Data set by the request
         *
         * @type object
         */
        this.attributes = new Map();
        /**
         * Base Url for the API
         *
         * @type string
         */
        this.baseUrl = '/v1';
        /**
         * Local custom key
         *
         * @type {string}
         */
        this.cid = '';
        /**
         * Endpoint key
         *
         * https://api.sotw.com/v1/{endpoint}
         *
         * @type string
         */
        this.endpoint = '';
        /**
         * Limit
         *
         * @type number
         */
        this.limit = 15;
        /**
         * Page
         *
         * @type number
         */
        this.page = 1;
        /**
         * Used for identifying local models
         *
         * @type {string}
         */
        this.cidPrefix = 'c';
        /**
         * The key that collection data exists on, e.g.
         *
         * {
         *     data: [ .. ]
         * }
         *
         * @type string
         */
        this.dataKey = 'data';
        // Set options on class
        Object.assign(this, options);
        // Setup
        this.builder = new Builder_1.default(this);
    }
    /**
     * Model if we provide a specific identifier
     *
     * @return boolean
     */
    get isModel() {
        return this.builder.identifier !== undefined;
    }
    /**
     * Get attribute
     *
     * @param  string key
     *
     * @return string
     */
    attr(key) {
        return this.attributes.get(key);
    }
    /**
     * Set attributes by hashmap
     *
     * @param object = {} hash
     *
     * @return ActiveRecord
     */
    set(hash = {}) {
        for (let key in hash) {
            this.attributes.set(key, hash[key]);
        }
        return this;
    }
    /**
     * Unset attribute
     *
     * @param  string key
     *
     * @return ActiveRecord
     */
    unset(key) {
        this.attributes.delete(key);
        return this;
    }
    /**
     * Converts model to JSON object
     *
     * @return object
     */
    toJSON() {
        return JSON.parse(JSON.stringify(this.attributes));
    }
    // #region Actions
    delete() {
        // Not implemented
    }
    create() {
        // Not implemented
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.builder.identifier(id);
            return yield this.fetch();
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.fetch({});
        });
    }
    save() {
        // Not implemented
    }
    // #endregion Actions
    fetch(options = {}, queryParams = {}) {
        // Check for query params
        for (let key in queryParams) {
            this.builder.qp(key, queryParams[key]);
        }
        // Query params
        const url = this.builder
            .qp('limit', this.limit)
            .qp('page', this.page)
            .url;
        // Setup request
        this.request = new Request_1.default(url, {
            dataKey: this.dataKey,
        });
        // Request
        return this.request
            .fetch()
            // Save data
            .then((request) => {
            console.log("Sup request", request);
            console.log("Sup data", request.data);
            this.attributes = this.dataKey !== undefined
                ? request.data[this.dataKey]
                : request.data;
            return this;
        })
            // Parse to collection
            .then((self) => {
            // console.log('fuckin data', self);
            return this;
        })
            // Trigger events
            .then(() => {
            this.dispatch('complete', this);
        });
    }
}
exports.default = ActiveRecord;
