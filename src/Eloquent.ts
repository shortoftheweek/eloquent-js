
import Core from './Core';
import Request from './Request';
import {
    IModelRequestOptions,
    IModelRequestQueryParams
} from './Interfaces';

/**
 * Eloquent
 *
 * @type {[type]}
 */
export default class Eloquent extends Core
{

    /**
     * Endpoint key
     *
     * https://api.sotw.com/v1/{endpoint}
     *
     * @type string
     */
    public endpoint: string = '';

    /**
     * List of fields available
     *
     * @type string[]
     */
    public fields: string[] = [];

    /**
     * Limit
     *
     * @type number
     */
    public limit: number = 15;

    /**
     * Page
     *
     * @type number
     */
    public page: number = 1;

    /**
     * List of fields available
     *
     * @type string[]
     */
    public rules: string[] = [];

    /**
     * List of relationships available
     *
     * @type object
     */
    public relationships: object = { };

    /**
     * Last request
     *
     * @type Request
     */
    public request?: Request;

    /**
     * Base Url for the API
     *
     * @type string
     */
    protected baseUrl: string = '/v1';

    /**
     * The key that collection data exists on, e.g.
     *
     * {
     *     data: [ .. ]
     * }
     *
     * @type string
     */
    protected collectionKey: string = 'data';

    /**
     * Data set by the request
     *
     * @type object
     */
    protected data: object = { };

    /**
     * The key that model data exists on, e.g.
     *
     * {
     *     *would be here*
     * }
     *
     * @type string
     */
    protected modelKey: string = '';

    /**
     * Query params
     *
     * @type string
     */
    private get queryParamsAsString(): string
    {
        const obj: any = {
            limit: this.limit,
            page: this.page,
        }

        return new URLSearchParams(obj).toString();

        // return Object.keys(obj)
        //     .reduce(function(a: Array<string>, k: string){
        //         a.push(k + '=' + encodeURIComponent(obj[k]));
        //         return a;
        //     }, [])
        //     .join('&');
    }

    /**
     * Constructor
     */
    constructor(options: object = {})
    {
        super(options);

        // Set options on class
        Object.assign(this, options);
    }

    /**
     * Requestable URL
     *
     * @return string
     */
    public requestUrl(options: IModelRequestOptions | null = {}, queryParams: IModelRequestQueryParams = {}): string
    {
        const baseUrl: string = this.baseUrl;
        const endpoint: string = this.endpoint;
        const queryParamStr: string = this.queryParamsAsString;

        let urlBuilder = '';

        // Root API URI
        urlBuilder += baseUrl;
        urlBuilder += '/' + endpoint;

        // Check for ID
        if (options && options.id) {
            urlBuilder += '/' + options.id;
        }

        // ...

        // Separate query string
        urlBuilder += '?' + queryParamStr;

        // Check includes
        if (options && options.includes) {
            urlBuilder += '&includes=' + options.includes.join(',');
        }

        // Add additional query params
        if (queryParams !== {}) {
            urlBuilder += new URLSearchParams(queryParams).toString();
        }

        return urlBuilder;
    }

    // #region Actions

    public delete(): void
    {

    }

    public create(): void
    {

    }

    public async find(id: number): Promise<void | Request | Response>
    {
        return await this.fetch({
            id: id,
        });
    }

    public async get(): Promise<void | Request | Response>
    {
        return await this.fetch({

        });
    }

    public save(): void
    {

    }

    // #endregion Actions

    private fetch(options: IModelRequestOptions | null = {}, queryParams: IModelRequestQueryParams = {}): Promise<void | Request | Response>
    {
        const isModel: boolean = options !== null && !!options.id;
        const isCollection: boolean = !isModel;

        const url: string = this.requestUrl(options, queryParams);

        // Setup request
        this.request = new Request(url, {
            dataKey: isModel ? this.modelKey : this.collectionKey,
        });

        // Request
        return this.request
            .fetch()
            .then((request: any) => {
                this.data = request.data;
                return this;
            })
            .then(() => {
                this.dispatch('complete', this);
            });
    }

}
