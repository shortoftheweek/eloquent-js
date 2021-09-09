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
const node_fetch_1 = require("node-fetch");
const Core_1 = require("../Core");
class RequestError extends Error {
    constructor(status, text) {
        super(text);
        this.status = status;
        this.text = text;
    }
}
class Request extends Core_1.default {
    constructor(url, params = {}) {
        super();
        this.data = {};
        this.dataKey = '';
        this.headers = {};
        this.loading = false;
        this.method = 'get';
        this.mode = '';
        this.dataKey = params.dataKey;
        this.url = url;
        this.url = this.url.replace(/\?$/, '');
        this.url = this.url.replace(/\?&/, '?');
    }
    fetch(method = 'GET', body = null, headers = {}) {
        this.method = method || 'GET';
        this.dispatch('fetch:before');
        var headers = Object.assign(this.headers, headers);
        var params = {};
        params.credentials = 'include';
        params.headers = headers;
        params.method = method || 'GET';
        params.redirect = 'follow';
        if (typeof FormData == 'undefined') {
            console.log('FormData is not compatible with nodejs yet');
        }
        body instanceof FormData
            ? body
            : typeof body == 'object'
                ? JSON.stringify(body)
                : body;
        if (body) {
            if (typeof FormData == undefined) {
                params.body =
                    typeof body == 'object' ? JSON.stringify(body) : body;
            }
            else {
                params.body =
                    body instanceof FormData
                        ? body
                        : typeof body == 'object'
                            ? JSON.stringify(body)
                            : body;
            }
        }
        var isFile = (!params.headers['Content-Type'] ||
            params.headers['Content-Type'].indexOf('multipart')) &&
            params.method.toLowerCase() === 'post';
        this.loading = true;
        this.dispatch('requesting', this);
        var response = isFile
            ? this.xhrFetch(this.url, params)
            : (0, node_fetch_1.default)(this.url, params);
        response.catch((e) => {
            this.dispatch('error:catch', e);
        });
        return response
            .then(this.beforeParse.bind(this))
            .then(this.parse.bind(this))
            .then(this.afterParse.bind(this))
            .then(this.afterFetch.bind(this))
            .then(this.afterAll.bind(this));
    }
    xhrFetch(url, params) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open(params.method, url);
        for (var key in params.headers) {
            xhr.setRequestHeader(key, params.headers[key]);
        }
        const xhrSend = xhr.send;
        xhr.send = function () {
            const xhrArguments = arguments;
            return new Promise(function (resolve, reject) {
                xhr.upload.onprogress = function (e) {
                    if (e.lengthComputable) {
                        self.dispatch('progress', {
                            loaded: e.loaded,
                            ratio: e.loaded / e.total,
                            total: e.total,
                        });
                    }
                    else {
                        self.dispatch('progress', {
                            loaded: e.loaded,
                            ratio: 1,
                            total: e.total,
                        });
                    }
                };
                xhr.onload = function () {
                    var blob = new Blob([xhr.response], {
                        type: 'application/json',
                    });
                    var init = {
                        status: xhr.status,
                        statusText: xhr.statusText,
                    };
                    var response = new Response(xhr.response ? blob : null, init);
                    resolve(response);
                };
                xhr.onerror = function () {
                    reject({
                        request: xhr,
                    });
                };
                xhrSend.apply(xhr, xhrArguments);
            });
        };
        xhr.withCredentials = true;
        return xhr.send(params.body);
    }
    setHeader(header, value) {
        this.headers[header] = value;
        return this;
    }
    setHeaders(headers) {
        this.headers = headers;
    }
    beforeParse(response) {
        this.dispatch('parse:before');
        this.response = response;
        return this;
    }
    parse(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.dispatch('parse:parsing');
            if (request.response) {
                if (request.response.status != 204) {
                    this.data = yield request.response.json();
                }
            }
            this.dispatch('parse', this.data);
            return request;
        });
    }
    afterParse(request) {
        if (request &&
            request.response &&
            request.response.status >= 400 &&
            this.data.status) {
            throw new RequestError(request.response.status, this.data.status);
        }
        this.dispatch('parse:after');
        return request;
    }
    afterFetch(request) {
        this.dispatch('fetch', request.data);
        this.dispatch('fetch:after');
        this.loading = false;
        return request;
    }
    afterAll(request) {
        if (request && request.response && request.response.ok) {
            this.dispatch('complete', this);
            this.dispatch('complete:' + this.method, this);
        }
        else {
            this.dispatch('error:' + this.method, request.data);
            throw new Error(request && request.data
                ? request.data.error || request.data.message
                : 'After All');
        }
        return request;
    }
}
exports.default = Request;
//# sourceMappingURL=Request.js.map