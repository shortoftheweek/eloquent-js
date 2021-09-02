// The node-fetch module creates failures in things like NativeScript which
// would use a built-in version of "fetch". Do we need this?
import fetch from 'node-fetch';
import Core from '../Core';
import { IAttributes } from '../Interfaces';

/**
 * Request Error
 */
class RequestError extends Error {
    public status: number;
    public text: string;

    constructor(status: number, text: string) {
        super(text);

        this.status = status;
        this.text = text;
    }
}

/**
 * Request
 *
 * @todo
 */
export default class Request extends Core {
    /**
     * Parsed data from response
     *
     * @type {object}
     */
    public data: IAttributes = {};

    /**
     * Where to find the data
     *
     * @type {string}
     */
    public dataKey: string = '';

    /**
     * Headers
     *
     * Do not set the 'Content-Type' here because it wont be
     * overridden; which will break file uploads.
     *
     * @type {string}
     */
    public headers: any = {};

    /**
     * If this request is currently loading
     *
     * @type {boolean}
     */
    public loading: boolean = false;

    /**
     * Method
     *
     * Example: 'get'
     *
     * @type {string}
     */
    public method: string = 'get';

    /**
     * Mode
     *
     * Example: cors, no-cors, same-origin, navigate
     *
     * @type {string}
     */
    public mode: string = '';

    /**
     * Last fetch
     *
     * @type {Promise<Repsonse>}
     */
    public request?: Promise<Request | Response>;

    /**
     * Response from fetch
     *
     * @type Response
     */
    public response?: Response;

    /**
     * @type {string}
     */
    public url: string;

    /**
     * Constructor
     */
    constructor(url: string, params: any = {}) {
        super();

        //
        this.dataKey = params.dataKey;
        this.url = url;

        // Fix URL
        this.url = this.url.replace(/\?$/, '');
        this.url = this.url.replace(/\?&/, '?');
    }

    /**
     * Actually fetch the data
     */
    public fetch(
        method: string | null = 'GET',
        body: any = null,
        headers: any = {}
    ): Promise<Request> {
        this.method = method || 'GET';

        this.dispatch('fetch:before');

        // Combine headers
        var headers = Object.assign(this.headers, headers);

        // Fetch params
        var params: any = {};

        params.headers = headers;
        params.method = method || 'GET';
        params.redirect = 'follow';

        if (typeof FormData == 'undefined') {
            console.log('FormData is not compatible with nodejs yet');
            // return;
        }

        body instanceof FormData
            ? body
            : typeof body == 'object'
            ? JSON.stringify(body)
            : body;

        if (body) {
            // For node
            if (typeof FormData == undefined) {
                params.body =
                    typeof body == 'object' ? JSON.stringify(body) : body;
            }
            // For web
            else {
                params.body =
                    body instanceof FormData
                        ? body
                        : typeof body == 'object'
                        ? JSON.stringify(body)
                        : body;
            }
        }

        // Is File?
        // @todo this is inaccurate and makes many requests (forgot password) think it's a file
        var isFile =
            (!params.headers['Content-Type'] ||
                params.headers['Content-Type'].indexOf('multipart')) &&
            params.method.toLowerCase() === 'post';

        // Loading
        this.loading = true;

        // Events
        this.dispatch('requesting', this);

        // Log
        // console.log('Making request as follows:', params);

        // Create request
        var response = isFile
            ? this.xhrFetch(this.url, params)
            : fetch(this.url, params);

        // Catch errors
        response.catch((e: Error) => {
            this.dispatch('error:catch', e);
        });

        return response
            .then(this.beforeParse.bind(this))
            .then(this.parse.bind(this))
            .then(this.afterParse.bind(this))
            .then(this.afterFetch.bind(this))
            .then(this.afterAll.bind(this));
    }

    /**
     * XHR Fetch
     *
     * Specifically for file uploaders
     *
     * XMLHttpRequest
     *     onabort: null
     *     onerror: ƒ ()
     *     onload: ƒ ()
     *     onloadend: ƒ (e)
     *     onloadstart: null
     *     onprogress: ƒ (e)
     *     onreadystatechange: null
     *     ontimeout: null
     *     readyState: 4
     *     response: "{"id":262,"url":"https:\/\/static.sotw.com\/media\/film\/154\/5f2d54d1c26dc.jpg",
     *     responseText: "{"id":262,"url":"https:\/\/static.sotw.com\/media\/film\/154\/5f2d54d1c26dc.jpg",
     *     responseType: ""
     *     responseURL: "https://api.sotw.com/v1/film/154/media?&mediaType=1&imageType=4&videoType=4&limit=15&page=1"
     *     responseXML: null
     *     send: ƒ ()
     *     status: 200
     *     statusText: "OK"
     *     timeout: 0
     *     upload: XMLHttpRequestUpload {onloadstart: null, onprogress: null, onabort: null, onerror: null, onload: null, …}
     *     withCredentials: false
     *
     * Response
     *     body: (...)
     *     bodyUsed: false
     *     headers: Headers {}
     *     ok: true
     *     redirected: false
     *     status: 200
     *     statusText: ""
     *     type: "default"
     *     url: ""
     *
     * @param  {string} url
     * @param  {any} params
     * @return {any}
     */
    public xhrFetch(url: string, params: any): any {
        var self = this;
        var xhr = new XMLHttpRequest();

        // Open Request
        xhr.open(params.method, url);

        // Set Headers
        for (var key in params.headers) {
            xhr.setRequestHeader(key, params.headers[key]);
        }

        // Copy old `send`
        const xhrSend = xhr.send;

        // Create new `send`
        xhr.send = function () {
            const xhrArguments: any = arguments;

            return new Promise(function (resolve, reject) {
                xhr.upload.onprogress = function (e) {
                    if (e.lengthComputable) {
                        self.dispatch('progress', {
                            loaded: e.loaded,
                            ratio: e.loaded / e.total,
                            total: e.total,
                        });
                    } else {
                        self.dispatch('progress', {
                            loaded: e.loaded,
                            ratio: 1,
                            total: e.total,
                        });
                    }
                };

                // xhr.onloadend = function(e: ProgressEvent) {
                //     const xhr: XMLHttpRequest = <XMLHttpRequest> e.currentTarget;
                //     var status = xhr.status;
                //     var json = JSON.parse(xhr.response);

                //     // Error
                //     if (status >= 400) {
                //         reject({
                //             status: status,
                //             statusText: json.status,
                //         });
                //         // throw new RequestError(status, json.status);
                //     }
                // }

                xhr.onload = function () {
                    var blob = new Blob([xhr.response], {
                        type: 'application/json',
                    });
                    var init = {
                        status: xhr.status,
                        statusText: xhr.statusText,
                    };
                    var response = new Response(
                        xhr.response ? blob : null,
                        init
                    );

                    // Resolved
                    resolve(response);

                    // if (xhr.status < 200 || xhr.status >= 300) {
                    //     reject({ response });
                    // }
                    // else {
                    //     resolve(response);
                    // }
                };

                xhr.onerror = function () {
                    reject({
                        request: xhr,
                    });
                };

                xhrSend.apply(xhr, xhrArguments);
            });
        };

        return xhr.send(params.body);
    }

    /**
     * Set specific header
     *
     * @param  {string} header
     * @param  {string} value
     * @return {any}
     */
    public setHeader(header: string, value: string): any {
        this.headers[header] = value;

        return this;
    }

    /**
     * Override and set headers
     *
     * @param  {any} headers
     * @return {any}
     */
    public setHeaders(headers: any): any {
        this.headers = headers;
    }

    /**
     * Before parsing data
     *
     * @todo Check if we have valid JSON
     * @todo Check if the request was an error
     *
     * @param {any} x [description]
     */
    private beforeParse(response: any): Request {
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
    private async parse(request: Request) {
        // Trigger
        this.dispatch('parse:parsing');

        // Set data
        if (request.response) {
            // Data on 200 OK
            // if (request.response.status == 200) {
            if (request.response.status != 204) {
                this.data = await request.response.json();
            }
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
    private afterParse(request: Request): Request {
        if (
            request &&
            request.response &&
            request.response.status >= 400 &&
            this.data.status
        ) {
            // if (this.data && this.data.code >= 400) {
            throw new RequestError(request.response.status, this.data.status);
        }

        // Trigger
        this.dispatch('parse:after');

        return request;
    }

    /**
     * After data fetched
     *
     * @param {any} x [description]
     */
    private afterFetch(request: Request): Request {
        // Trigger
        this.dispatch('fetch', request.data);

        // Trigger
        this.dispatch('fetch:after');

        // Not loading
        this.loading = false;

        return request;
    }

    /**
     * After all
     *
     * @param {any} x [description]
     */
    private afterAll(request: Request): Request {
        // Check request
        if (request && request.response && request.response.ok) {
            this.dispatch('complete', this);
            this.dispatch('complete:' + this.method, this);
        }
        else {
            this.dispatch('error', request.data);
            this.dispatch('error:' + this.method, request.data);
            throw new Error(
                request && request.data
                    ? request.data.error || request.data.message
                    : 'After All'
            );
        }

        return request;
    }
}
