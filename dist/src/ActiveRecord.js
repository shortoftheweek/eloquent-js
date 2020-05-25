import Builder from './Builder';
import Core from './Core';
import Request from './Http/Request';
/**
 * ActiveRecord
 *
 * @type {[type]}
 */
export default class ActiveRecord extends Core {
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
        this.builder = new Builder(this);
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
    async find(id) {
        this.builder.identifier(id);
        return await this.fetch();
    }
    async get() {
        return await this.fetch({});
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
        this.request = new Request(url, {
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
//# sourceMappingURL=ActiveRecord.js.map