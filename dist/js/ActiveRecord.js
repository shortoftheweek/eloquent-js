System.register(["./Http/Builder", "./Core", "./Http/Request"], function (exports_1, context_1) {
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
    var Builder_1, Core_1, Request_1, ActiveRecord;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Builder_1_1) {
                Builder_1 = Builder_1_1;
            },
            function (Core_1_1) {
                Core_1 = Core_1_1;
            },
            function (Request_1_1) {
                Request_1 = Request_1_1;
            }
        ],
        execute: function () {
            ActiveRecord = class ActiveRecord extends Core_1.default {
                constructor(options = {}) {
                    super(options);
                    this.attributes = new Object();
                    this.baseUrl = '/v1';
                    this.body = null;
                    this.cacheable = true;
                    this.cid = '';
                    this.endpoint = '';
                    this.headers = {};
                    this.id = '';
                    this.limit = 15;
                    this.loading = false;
                    this.meta = {};
                    this.modifiedEndpoint = null;
                    this.page = 1;
                    this.cidPrefix = 'c';
                    this.dataKey = 'data';
                    Object.assign(this, options);
                    this.lastRequest = {};
                    this.builder = new Builder_1.default(this);
                    this.options(options);
                    this.requestTime = Date.now();
                }
                get b() {
                    return this.builder;
                }
                get isModel() {
                    return this.builder.identifier !== undefined;
                }
                attr(key) {
                    return this.attributes[key];
                }
                set(hash = {}, trigger = true) {
                    var possibleSetters = Object.getOwnPropertyDescriptors(this.__proto__);
                    for (let key in hash) {
                        this.attributes[key] = hash[key];
                        if (possibleSetters && possibleSetters[key] && possibleSetters[key].set) {
                            this[key] = hash[key];
                        }
                    }
                    if (hash && hash['id']) {
                        this.id = hash.id;
                    }
                    if (trigger) {
                        this.dispatch('set');
                    }
                    return this;
                }
                unset(key) {
                    delete this.attributes[key];
                    return this;
                }
                options(options = {}) {
                    if (options.endpoint) {
                        this.setEndpoint(options.endpoint);
                    }
                    if (options.headers) {
                        this.setHeaders(options.headers);
                    }
                    if (options.meta) {
                        this.meta = options.meta;
                    }
                    if (options.params || options.qp || options.queryParams) {
                        this.setQueryParams(options.queryParams || options.qp || options.params);
                    }
                    return this;
                }
                toJSON() {
                    let json = this.attributes;
                    var possibleGetters = Object.getOwnPropertyNames(this.__proto__);
                    for (var key of possibleGetters) {
                        if (json[key] && this[key] && this[key].toJSON) {
                            json[key] = this[key].toJSON();
                        }
                    }
                    return json;
                }
                create(attributes) {
                    return this.post(attributes);
                }
                delete(attributes = null) {
                    const url = this.builder
                        .identifier(this.id || (attributes ? attributes.id : ''))
                        .url;
                    if (this.builder.id) {
                        var model = this.find(attributes);
                        this.remove(model);
                    }
                    const body = null;
                    const headers = this.headers;
                    const method = 'DELETE';
                    return this._fetch(null, {}, method, body, headers);
                }
                post(attributes = null) {
                    const url = this.builder.url;
                    const body = attributes || this.attributes;
                    const headers = this.headers;
                    const method = 'POST';
                    return this._fetch(null, {}, method, body, headers);
                }
                put(attributes) {
                    const url = this.builder.url;
                    const body = attributes || this.attributes;
                    const headers = this.headers;
                    const method = 'PUT';
                    return this._fetch(null, {}, method, body, headers);
                }
                save(attributes = null) {
                    const url = this.builder
                        .identifier(this.id || (attributes ? attributes.id : ''))
                        .url;
                    const body = attributes || this.attributes;
                    const headers = this.headers;
                    const method = this.id ? 'PUT' : 'POST';
                    return this._fetch(null, {}, method, body, headers);
                }
                add(x) { }
                remove(x) { }
                reset() {
                    this.attributes = {};
                }
                find(id, queryParams = {}) {
                    return __awaiter(this, void 0, void 0, function* () {
                        return yield this.fetch({ id }, queryParams)
                            .then(request => {
                            return this;
                        });
                    });
                }
                file(name, file) {
                    const url = this.builder
                        .identifier(this.id)
                        .url;
                    const formData = new FormData();
                    if (file instanceof HTMLInputElement) {
                        file = file.files[0];
                    }
                    else if (file instanceof FileList) {
                        file = file[0];
                    }
                    else if (file instanceof File) {
                    }
                    else {
                        console.warn('File provided unacceptable type.');
                    }
                    this.unsetHeader('Content-Type');
                    formData.append(name, file);
                    return this._fetch(null, {}, 'POST', formData)
                        .then((request) => {
                        this.dispatch('file:complete', this);
                        return request;
                    });
                }
                fetch(options = {}, queryParams = {}) {
                    return __awaiter(this, void 0, void 0, function* () {
                        return yield this._fetch(options, queryParams);
                    });
                }
                upload(name, file) {
                    return this.file(name, file);
                }
                runLast() {
                    return this._fetch(this.lastRequest.options, this.lastRequest.queryParams, this.lastRequest.method, this.lastRequest.body, this.lastRequest.headers);
                }
                useModifiedEndpoint(activeRecord) {
                    this.modifiedEndpoint = activeRecord.endpoint + '/' + activeRecord.id + '/' + this.endpoint;
                    return this;
                }
                setBody(value) {
                    this.body = value;
                    return this;
                }
                setEndpoint(endpoint) {
                    this.modifiedEndpoint = null;
                    this.endpoint = endpoint;
                    return this;
                }
                setHeader(header, value) {
                    this.headers[header] = value;
                    return this;
                }
                setHeaders(headers) {
                    for (var k in headers) {
                        this.setHeader(k, headers[k]);
                    }
                    return this;
                }
                setId(id) {
                    this.id = id;
                    return this;
                }
                unsetId() {
                    this.id = '';
                    return this;
                }
                unsetHeader(header) {
                    this.setHeader(header, null);
                    delete this.headers[header];
                    return this;
                }
                setQueryParam(key, value) {
                    this.builder.qp(key, value);
                    return this;
                }
                setQueryParams(params) {
                    for (var k in params) {
                        this.setQueryParam(k, params[k]);
                    }
                    return this;
                }
                unsetQueryParam(param) {
                    delete this.builder.queryParams[param];
                    return this;
                }
                setToken(token) {
                    this.setHeader('Authorization', 'Bearer ' + token);
                    return this;
                }
                _fetch(options = {}, queryParams = {}, method = null, body = null, headers = null) {
                    this.lastRequest = {
                        options,
                        queryParams,
                        method,
                        body,
                        headers,
                    };
                    this.requestTime = Date.now();
                    if (!this.cacheable) {
                        this.builder.qp('cb', Date.now());
                    }
                    for (let key in queryParams) {
                        this.builder.qp(key, queryParams[key]);
                    }
                    if (options && options.id) {
                        this.builder.identifier(options.id);
                    }
                    const url = this.builder.url;
                    this.dispatch('requesting', this);
                    this.loading = true;
                    var request = this.request = new Request_1.default(url, {
                        dataKey: this.dataKey,
                    });
                    request.on('parse:after', e => {
                        method = method || 'get';
                        if (method.toLowerCase() === 'post') {
                            this.add(request.data);
                        }
                        else if (method.toLowerCase() === 'delete') {
                        }
                        else {
                            this.set(this.dataKey !== undefined
                                ? request.data[this.dataKey]
                                : request.data);
                        }
                        this.options({
                            meta: request.data.meta,
                        });
                        this.dispatch('fetched', this);
                    });
                    request.on('progress', e => {
                        this.dispatch('progress', e.data);
                    });
                    request.on('complete', e => {
                        this.loading = false;
                        this.dispatch('complete');
                    });
                    return request.fetch(method, body || this.body, headers || this.headers);
                }
            };
            exports_1("default", ActiveRecord);
        }
    };
});
//# sourceMappingURL=ActiveRecord.js.map