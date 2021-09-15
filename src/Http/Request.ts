// The node-fetch module creates failures in things like NativeScript which
// would use a built-in version of "fetch". Do we need this?
import axios from 'axios';
import { AxiosResponse } from 'axios';
import Core from '../Core';
import { IAttributes, IAxiosConfig, IAxiosError, IAxiosResponse, IAxiosSuccess } from '../Interfaces';

/**
 * Request Error
 */
class RequestError extends Error
{
    public status: number;
    public text: string;

    /**
     * Error after request
     *
     * @param number status
     * @param string text
     */
    constructor(status: number, text: string)
    {
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
export default class Request extends Core
{
    /**
     * Parsed data from response
     *
     * @type object
     */
    public data: IAttributes = {};

    /**
     * Where to access the data on the object
     * {
     *     [dataKey]: [ ]
     * }
     *
     * @type string
     */
    public dataKey: string = '';

    /**
     * Headers
     *
     * Do not set the 'Content-Type' here because it wont be
     * overridden; which will break file uploads.
     *
     * @type string
     */
    public headers: any = {};

    /**
     * If this request is currently loading
     *
     * @type boolean
     */
    public loading: boolean = false;

    /**
     * Method (get, post, patch, ...)
     *
     * @type string
     */
    public method: string = 'get';

    /**
     * Mode (cors, no-cors, same-origin, navigate)
     *
     * @type string
     */
    public mode: string = '';

    /**
     * Last fetch
     *
     * @type Promise<Repsonse>
     */
    public request?: Promise<Request | Response | AxiosResponse<any>>;

    /**
     * Response from fetch
     *
     * @type Response
     */
    public response?: IAxiosResponse | IAxiosSuccess

    /**
     * @type string
     */
    public url: string;

    /**
     * @param string url
     * @param object params
     */
    constructor(url: string = '', params: any = {})
    {
        super();

        // Set url and datakey
        this.dataKey = params.dataKey;
        this.url = url;

        // Fix URL
        this.url = this.url.replace(/\?$/, '');
        this.url = this.url.replace(/\?&/, '?');
    }

    /**
     * Actually fetch the data
     *
     * @param string method
     * @param object body
     * @param object headers
     */
    public fetch(
        method: string | null = 'GET',
        body: any = null,
        headers: any = {}
    ): Promise<Request | AxiosResponse<any>> {
        this.method = (method || 'GET').toUpperCase();

        // Event trigger
        this.dispatch('fetch:before');

        // Combine headers
        var headers = Object.assign(this.headers, headers);

        // Fetch params
        var params: any = {};

        // mk: For XHR or Axios
        params.data = body;
        params.headers = headers;
        params.method = this.method;
        params.redirect = 'follow';
        params.url = this.url;
        params.withCredentials = true;

        // Is File?
        // @todo this is inaccurate and makes many requests (forgot password) think it's a file
        // var isFile =
        //     (!params.headers['Content-Type'] ||
        //         params.headers['Content-Type'].indexOf('multipart')) &&
        //     params.method.toLowerCase() === 'post';

        // Loading
        this.loading = true;

        // Events
        this.dispatch('requesting', this);

        return new Promise((resolve, reject) => {
            axios(params)
                .then((e: AxiosResponse<any>) => {
                    this.response = e as IAxiosSuccess;

                    this.beforeParse(this.response);
                    this.parse(this.response);
                    this.afterParse(this.response);
                    this.afterFetch(this.response);
                    this.afterAll(this.response);

                    resolve(this);

                    return e;
                })
                // @see https://axios-http.com/docs/handling_errors
                .catch((e: IAxiosError) => {
                    this.response = e.response;

                    this.afterAll(e);

                    reject(this);

                    return e;
                });
        });
    }

    /**
     * XHR Fetch
     *
     * Specifically for file uploaders
     * I don't think we use this anymore.
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
    public xhrFetch(url: string, params: any): any
    {
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

        // Send cookies
        xhr.withCredentials = true;

        return xhr.send(params.body);
    }

    /**
     * @param string header
     * @param string value
     * @return self
     */
    public setHeader(header: string, value: string): any
    {
        this.headers[header] = value;
        return this;
    }

    /**
     * Override and set headers
     *
     * @param object headers
     * @return self
     */
    public setHeaders(headers: any): any
    {
        this.headers = headers;
        return this;
    }

    /**
     * Before parsing data
     *
     * @todo Check if we have valid JSON
     * @todo Check if the request was an error
     *
     * @param e IAxiosResponse
     */
    private beforeParse(e: IAxiosSuccess): IAxiosSuccess
    {
        this.log('before parse');

        // Trigger
        this.dispatch('parse:before', this);

        return e;
    }

    /**
     * Parse data
     *
     * @param IAxiosSuccess e
     */
    private parse(e: IAxiosSuccess): IAxiosSuccess
    {
        this.log('parse');

        // Trigger
        this.dispatch('parse:parsing', this);

        // Set data
        if (e.status != 204) {
            this.data = e.data;
            // this.data = await request.response.json();
        }

        // Trigger
        this.dispatch('parse', this.data);

        return e;
    }

    /**
     * After data parsed
     *
     * @param IAxiosSuccess e
     */
    private afterParse(e: IAxiosSuccess): IAxiosSuccess
    {
        this.log('after parse');

        // Check if we have a status in the JSON as well
        if (e.status >= 400 && e.data?.status) {
            const message: string = e.data?.message
                || e.data
                || '';

            throw new RequestError(e.status, message);
        }

        // Trigger
        this.dispatch('parse:after', this);

        return e;
    }

    /**
     * After data fetched
     *
     * @param IAxiosSuccess e
     */
    private afterFetch(e: IAxiosSuccess): IAxiosSuccess
    {
        this.log('after fetch');

        // Trigger
        this.dispatch('fetch', e.data);

        // Trigger
        this.dispatch('fetch:after', this);

        // Not loading
        this.loading = false;

        return e;
    }

    /**
     * After all
     *
     * @param IAxiosSuccess e
     */
    private afterAll(e: IAxiosSuccess | IAxiosError): IAxiosSuccess | IAxiosError
    {
        function isError(e: any): e is IAxiosError {
            return 'name' in e;
        }

        const data: any = isError(e) ? e.response.data : e.data;
        const status: number = isError(e) ? e.response?.status : e.status
        const method: string = (e.config.method || 'get').toLowerCase();

        // Log
        this.log('after all: ' + method + ' / ' + status);

        // Check request
        if (status < 400) {
            this.dispatch('complete', this);
            this.dispatch('complete:' + method, this);
        }
        else {
            // mk: Apparently, throw Error does same as dispatch 'error' which
            // causes duplicates when listening on('error' ...)
            // this.dispatch('error', e.data);
            this.data = data;
            this.dispatch('error:' + method, this);
        }

        return e;
    }

    /**
     * @param string msg
     */
    private log(msg: string = ''): void
    {
        // console.log(' > ' + msg);
    }
}
