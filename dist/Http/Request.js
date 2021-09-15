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
    constructor(url = '', params = {}) {
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
        this.method = (method || 'GET').toUpperCase();
        this.dispatch('fetch:before');
        var headers = Object.assign(this.headers, headers);
        var params = {};
        params.data = body;
        params.headers = headers;
        params.method = this.method;
        params.redirect = 'follow';
        params.url = this.url;
        params.withCredentials = true;
        this.loading = true;
        this.dispatch('requesting', this);
        return new Promise((resolve, reject) => {
            (0, axios_1.default)(params)
                .then((e) => {
                this.response = e;
                this.beforeParse(this.response);
                this.parse(this.response);
                this.afterParse(this.response);
                this.afterFetch(this.response);
                this.afterAll(this.response);
                resolve(this);
                return e;
            })
                .catch((e) => {
                this.response = e.response;
                this.afterAll(e);
                reject(this);
                return e;
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
    beforeParse(e) {
        this.log('before parse');
        this.dispatch('parse:before', this);
        return e;
    }
    parse(e) {
        this.log('parse');
        this.dispatch('parse:parsing', this);
        if (e.status != 204) {
            this.data = e.data;
        }
        this.dispatch('parse', this.data);
        return e;
    }
    afterParse(e) {
        var _a, _b;
        this.log('after parse');
        if (e.status >= 400 && ((_a = e.data) === null || _a === void 0 ? void 0 : _a.status)) {
            const message = ((_b = e.data) === null || _b === void 0 ? void 0 : _b.message)
                || e.data
                || '';
            throw new RequestError(e.status, message);
        }
        this.dispatch('parse:after', this);
        return e;
    }
    afterFetch(e) {
        this.log('after fetch');
        this.dispatch('fetch', e.data);
        this.dispatch('fetch:after', this);
        this.loading = false;
        return e;
    }
    afterAll(e) {
        var _a;
        function isError(e) {
            return 'name' in e;
        }
        const data = isError(e) ? e.response.data : e.data;
        const status = isError(e) ? (_a = e.response) === null || _a === void 0 ? void 0 : _a.status : e.status;
        const method = (e.config.method || 'get').toLowerCase();
        this.log('after all: ' + method + ' / ' + status);
        if (status < 400) {
            this.dispatch('complete', this);
            this.dispatch('complete:' + method, this);
        }
        else {
            this.data = data;
            this.dispatch('error:' + method, this);
        }
        return e;
    }
    log(msg = '') {
    }
}
exports.default = Request;
//# sourceMappingURL=Request.js.map