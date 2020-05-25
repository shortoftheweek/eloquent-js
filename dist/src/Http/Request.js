import Core from '../Core';
import fetch from 'node-fetch';
/**
 * Request
 *
 * @todo
 */
export default class Request extends Core {
    /**
     * Constructor
     */
    constructor(url, params = {}) {
        super();
        /**
         * Parsed data from response
         *
         * @type {object}
         */
        this.data = {};
        /**
         * Where to find the data
         *
         * @type {string}
         */
        this.dataKey = '';
        this.dataKey = params.dataKey;
        this.url = url;
    }
    /**
     * Actually fetch the data
     */
    fetch() {
        this.dispatch('fetch: before');
        var response = fetch(this.url, {
            // body: null,
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            // method: 'GET',
            // mode: 'cors',
            redirect: 'follow',
        });
        return response
            .then(this.beforeParse.bind(this))
            .then(this.parse.bind(this))
            .then(this.afterParse.bind(this))
            .then(this.afterFetch.bind(this));
    }
    /**
     * Before parsing data
     *
     * @todo Check if we have valid JSON
     * @todo Check if the request was an error
     *
     * @param {any} x [description]
     */
    beforeParse(response) {
        // Trigger
        this.dispatch('parse:before');
        // Save
        this.response = response;
        return this;
    }
    /**
     * Parse data
     *
     * @param {any} x [description]
     */
    async parse(request) {
        // Trigger
        this.dispatch('parse:parsing');
        // Set data
        if (request.response) {
            this.data = await request.response.json();
        }
        // Trigger
        this.dispatch('parse', this.data);
        return request;
    }
    /**
     * After data parsed
     *
     * @param {any} x [description]
     */
    afterParse(request) {
        // Trigger
        this.dispatch('parse:after');
        return request;
    }
    /**
     * After data fetched
     *
     * @param {any} x [description]
     */
    afterFetch(request) {
        // Trigger
        this.dispatch('fetch', request.data);
        // Trigger
        this.dispatch('fetch:after');
        return request;
    }
}
//# sourceMappingURL=Request.js.map