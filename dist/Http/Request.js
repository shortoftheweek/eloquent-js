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
const Core_1 = require("../Core");
const node_fetch_1 = require("node-fetch");
/**
 * Request
 *
 * @todo
 */
class Request extends Core_1.default {
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
        var response = node_fetch_1.default(this.url, {
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
    parse(request) {
        return __awaiter(this, void 0, void 0, function* () {
            // Trigger
            this.dispatch('parse:parsing');
            // Set data
            if (request.response) {
                this.data = yield request.response.json();
            }
            // Trigger
            this.dispatch('parse', this.data);
            return request;
        });
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
exports.default = Request;
