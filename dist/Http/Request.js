"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const Core_1 = require("../Core");
class RequestError extends Error {
    constructor(status, text) {
        super(text);
        this.status = status;
        this.text = text;
    }
}
class Request extends Core_1.default {
    constructor(url = '', options = {}) {
        super();
        this.dataKey = '';
        this.headers = {};
        this.loading = false;
        this.method = 'get';
        this.mode = '';
        this.name = 'EloquentRequest';
        this.responseData = {};
        this.dataKey = options.dataKey;
        this.url = url;
        this.url = this.url.replace(/\?$/, '');
        this.url = this.url.replace(/\?&/, '?');
    }
    fetch(method = 'GET', body = null, headers = {}) {
        this.method = (method || 'GET').toUpperCase();
        var headers = Object.assign(this.headers, headers);
        var params = {};
        params.data = body;
        params.headers = headers;
        params.method = this.method;
        params.redirect = 'follow';
        params.url = this.url;
        params.withCredentials = true;
        params.onUploadProgress = (progressEvent) => {
            this.dispatch('progress', {
                loaded: progressEvent.loaded,
                ratio: progressEvent.loaded / progressEvent.total,
                total: progressEvent.total,
            });
        };
        this.dispatch('fetch:before', { method, body, headers, params });
        this.loading = true;
        this.dispatch('requesting', { method, body, headers, params });
        return new Promise((resolve, reject) => {
            (0, axios_1.default)(params)
                .then((response) => {
                this.response = response;
                this.beforeParse(this.response);
                this.parse(this.response);
                this.afterParse(this.response);
                this.afterFetch(this.response);
                this.afterAll(this.response);
                resolve(this);
                return response;
            })
                .catch((error) => {
                this.response = error.response;
                this.afterAll(error);
                reject(this);
                return error;
            });
        });
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
        return this;
    }
    beforeParse(response) {
        this.log('before parse');
        this.dispatch('parse:before', response);
        return response;
    }
    parse(response) {
        this.log('parse');
        this.dispatch('parse:parsing', response);
        if (response.status != 204) {
            this.responseData = response.data;
        }
        this.dispatch('parse', this.responseData);
        return response;
    }
    afterParse(response) {
        var _a, _b;
        this.log('after parse');
        if (response.status >= 400 && ((_a = response.data) === null || _a === void 0 ? void 0 : _a.status)) {
            const message = ((_b = response.data) === null || _b === void 0 ? void 0 : _b.message)
                || response.data
                || '';
            throw new RequestError(response.status, message);
        }
        this.dispatch('parse:after', response);
        return response;
    }
    afterFetch(response) {
        this.log('after fetch');
        this.dispatch('fetch', response);
        this.dispatch('fetch:after', response);
        this.loading = false;
        return response;
    }
    afterAll(e) {
        var _a, _b;
        function isError(e) {
            return 'name' in e;
        }
        const data = isError(e)
            ? (((_a = e.response) === null || _a === void 0 ? void 0 : _a.data) || e.message)
            : e.data;
        const status = isError(e)
            ? (_b = e.response) === null || _b === void 0 ? void 0 : _b.status
            : e.status;
        const method = (e.config.method || 'get').toLowerCase();
        this.log('after all: ' + method + ' / ' + status);
        if (status < 400) {
            this.dispatch('complete', e);
            this.dispatch('complete:' + method, e);
        }
        else {
            this.responseData = data;
            this.dispatch('error', e);
            this.dispatch('error:' + method, e);
        }
        return e;
    }
    log(msg = '') {
    }
}
exports.default = Request;
//# sourceMappingURL=Request.js.map