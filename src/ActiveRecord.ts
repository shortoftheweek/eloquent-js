
import Builder from './Builder';
import Core from './Core';
import Request from './Http/Request';
import {
    IAttributes,
    IModelRequestOptions,
    IModelRequestQueryParams
} from './Interfaces';

/**
 * ActiveRecord
 *
 * @type {[type]}
 */
export default class ActiveRecord extends Core
{
    /**
     * Data set by the request
     *
     * @type object
     */
    // public attributes: Map<string, any> = new Map();
    public attributes: any = new Object();

    /**
     * Base Url for the API
     *
     * @type string
     */
    public baseUrl: string = '/v1';

    /**
     * Local custom key
     *
     * @type {string}
     */
    public cid: string = '';

    /**
     * Endpoint key
     *
     * https://api.sotw.com/v1/{endpoint}
     *
     * @type string
     */
    public endpoint: string = '';

    /**
     * List of headers
     *
     * @type {any}
     */
    public headers: any = {};

    /**
     * Unique key for directly fetching
     *
     * https://api.sotw.com/v1/{endpoint}
     *
     * @type string
     */
    public id: string = '';

    /**
     * Limit
     *
     * @type number
     */
    public limit: number = 15;

    /**
     * Meta
     *
     * @type object
     */
    public meta: any = {};

    /**
     * Page
     *
     * @type number
     */
    public page: number = 1;

    /**
     * Last request
     *
     * @type Request
     */
    public request?: Request;

    /**
     * API Query Builder
     *
     * @type Builder
     */
    protected builder: Builder;

    /**
     * Used for identifying local models
     *
     * @type {string}
     */
    protected cidPrefix: string = 'c';

    /**
     * The key that collection data exists on, e.g.
     *
     * {
     *     data: [ .. ]
     * }
     *
     * @type string
     */
    protected dataKey: string | undefined = 'data';

    /**
     * Get builder reference
     *
     * @return Builder
     */
    public get b(): Builder
    {
        return this.builder;
    }

    /**
     * Model if we provide a specific identifier
     *
     * @return boolean
     */
    protected get isModel(): boolean
    {
        return this.builder.identifier !== undefined;
    }

    /**
     * Constructor
     */
    constructor(options: any = {})
    {
        super(options);

        // Set options on class
        Object.assign(this, options);

        // Setup URL builder
        this.builder = new Builder(this);

        // Options
        this.options(options);
    }

    /**
     * Get attribute
     *
     * @param  string key
     *
     * @return string
     */
    public attr(key: string): string | number | null
    {
        return this.attributes[key];
    }

    /**
     * Set attributes by hashmap
     *
     * @param object = {} hash
     *
     * @return ActiveRecord
     */
    public set(hash: IAttributes = {}): any
    {
        for (let key in hash) {
            this.attributes[key] = hash[key];
        }

        // Check for ID
        if (hash && hash['id']) {
            this.id = hash.id;
        }

        // Trigger
        this.dispatch('set');

        return this;
    }

    /**
     * Unset attribute
     *
     * Attribute will be `undefined` after unsetting
     *
     * @param  string key
     *
     * @return ActiveRecord
     */
    public unset(key: string): any
    {
        delete this.attributes[key];

        return this;
    }

    /**
     * Apply an object to change options and set meta
     *
     * @param  {any} options
     * @return {ActiveRecord}
     */
    public options(options: any = { }): any
    {
        // Check options for headers
        if (options.headers) {
            this.setHeaders(options.headers);
        }

        // Set metadata
        if (options.meta) {
            this.meta = options.meta;
        }

        // Check options for params
        if (options.params || options.qp || options.queryParams) {
            this.setQueryParams(options.queryParams || options.qp || options.params);
        }

        return this;
    }

    /**
     * Converts model to JSON object
     *
     * @return object
     */
    public toJSON(): object
    {
        return this.attributes;
        // // @ts-ignore
        // return Object.fromEntries(this.attributes.entries());
    }


    // #region Actions

    public delete(): void
    {
        // Not implemented
    }

    public create(): void
    {
        // Not implemented
    }

    /**
     * Used to get an individual item in a model
     *
     * Can pass either an ID #XX or a slug
     *
     * @param  {string | number} id
     * @return {Promise}
     */
    public async find(id: string | number, queryParams: IModelRequestQueryParams = {}): Promise<void | Request | Response>
    {
        this.builder.identifier(id);

        return await this.fetch(null, queryParams);
    }

    /**
     * Public generic fetch method
     *
     * NOTE: It is favored to use other methods
     *
     * @param  {IModelRequestOptions | null = {}} options
     * @param  {IModelRequestQueryParams = {}} queryParams
     * @return {Promise}
     */
    public async fetch(options: IModelRequestOptions | null = {}, queryParams: IModelRequestQueryParams = {}): Promise<void | Request | Response>
    {
        return await this._fetch(options, queryParams);
    }

    // @todo rename this.We can do something else
    // public async get(): Promise<void | Request | Response>
    // {
    //     return await this.fetch({

    //     });
    // }

    // public save(): void
    // {
    //     const attributes: any = this.attributes;

    //     // Save
    //     this.fetch({
    //         id: 5
    //     });
    // }

    /**
     * Set specific header
     *
     * @param  {string} header
     * @param  {string} value
     * @return {any}
     */
    public setHeader(header: string, value: string): any
    {
        this.headers[header] = value;

        return this;
    }

    /**
     * Override and set headers
     *
     * @param  {any} headers
     * @return {any}
     */
    public setHeaders(headers: any): any
    {
        for (var k in headers) {
            this.setHeader(k, headers[k]);
        }

        return this;
    }

    /**
     * Override and set headers
     *
     * @param  {any} headers
     * @return {any}
     */
    public unsetHeader(header: string): any
    {
        delete this.headers[header];

        return this;
    }

    /**
     * Set specific query param
     *
     * @param  {string} key
     * @param  {string} value
     * @return {any}
     */
    public setQueryParam(key: string, value: string): any
    {
        this.builder.qp(key, value);

        return this;
    }

    /**
     * Override and set query params
     *
     * @param  {any} params
     * @return {any}
     */
    public setQueryParams(params: any): any
    {
        for (var k in params) {
            this.setQueryParam(k, params[k]);
        }

        return this;
    }

    /**
     * Override and set query param
     *
     * @param  {any} headers
     * @return {any}
     */
    public unsetQueryParam(param: string): any
    {
        delete this.builder.queryParams[param];

        return this;
    }

    /**
     * Override and set headers
     *
     * @param  {string} token
     * @return {any}
     */
    public setToken(token: string): any
    {
        this.setHeader('Authorization', 'Bearer ' + token);

        return this;
    }

    // #endregion Actions


    private _fetch(options: IModelRequestOptions | null = {}, queryParams: IModelRequestQueryParams = {}): Promise<void | Request | Response>
    {
        this.builder
            .qp('limit', this.limit)
            .qp('page', this.page)

        // Check for query params
        for (let key in queryParams) {
            this.builder.qp(key, queryParams[key]);
        }

        // Query params
        const url: string = this.builder.url;

        // Setup request
        this.request = new Request(url, {
            dataKey: this.dataKey,
        });

        // Events
        this.dispatch('fetching', this);

        // Request
        return this.request
            .fetch()

            // Save data
            .then((request: Request) => {
                // Set data
                this.set(this.dataKey !== undefined
                    ? request.data[this.dataKey]
                    : request.data);

                // Set options
                this.options({
                    meta: request.data.meta,
                });

                // Events
                this.dispatch('fetched', this);

                return this;
            })

            // // Parse to collection
            // .then((self: any) => {
            //     // console.log('fuckin data', self);
            //     return this;
            // })

            // Trigger events
            .then(() => {
                this.dispatch('complete', this);
            });
    }
}
