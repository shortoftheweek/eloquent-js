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
        return (0, axios_1.default)(params)
            .then(e => {
            this.response = e;
            this.beforeParse(e);
            this.parse(e);
            this.afterParse(e);
            this.afterFetch(e);
            this.afterAll(e);
            return e;
        })
            .catch(error => {
            this.afterAll(error);
            return error;
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
    }
    beforeParse(e) {
        this.log('before parse');
        this.dispatch('parse:before');
        return e;
    }
    parse(e) {
        this.log('parse');
        this.dispatch('parse:parsing');
        if (e.status != 204) {
            this.data = e.data;
        }
        this.dispatch('parse', this.data);
        return e;
    }
    afterParse(e) {
        this.log('after parse');
        if (e.status >= 400 && this.data.status) {
            throw new RequestError(e.status, this.data.status);
        }
        this.dispatch('parse:after');
        return e;
    }
    afterFetch(e) {
        this.log('after fetch');
        this.dispatch('fetch', e.data);
        this.dispatch('fetch:after');
        this.loading = false;
        return e;
    }
    afterAll(e) {
        var _a, _b;
        var status = ((_a = e.response) === null || _a === void 0 ? void 0 : _a.status) || e.status;
        this.log('after all: ' + this.method + ' / ' + status);
        if (status < 400) {
            this.dispatch('complete', this);
            this.dispatch('complete:' + this.method.toLowerCase(), this);
        }
        else {
            this.dispatch('error:' + this.method.toLowerCase(), (_b = e.response) === null || _b === void 0 ? void 0 : _b.data);
            throw e;
        }
        return e;
    }
    log(msg = '') {
    }
}
exports.default = Request;
//# sourceMappingURL=Request.js.map