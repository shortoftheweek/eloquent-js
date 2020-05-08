
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
    public attributes: Map<string, any> = new Map();

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
    constructor(options: object = {})
    {
        super(options);

        // Set options on class
        Object.assign(this, options);

        // Setup
        this.builder = new Builder(this);
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
        return this.attributes.get(key);
    }

    /**
     * Set attributes by hashmap
     *
     * @param object = {} hash
     *
     * @return ActiveRecord
     */
    public set(hash: IAttributes = {}) : ActiveRecord
    {
        for (let key in hash) {
            this.attributes.set(key, hash[key]);
        }

        return this;
    }

    /**
     * Unset attribute
     *
     * @param  string key
     *
     * @return ActiveRecord
     */
    public unset(key: string) : ActiveRecord
    {
        this.attributes.delete(key);

        return this;
    }

    /**
     * Converts model to JSON object
     *
     * @return object
     */
    public toJSON(): object
    {
        return JSON.parse(JSON.stringify(this.attributes));
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

    public async find(id: number): Promise<void | Request | Response>
    {
        this.builder.identifier(id);

        return await this.fetch();
    }

    public async get(): Promise<void | Request | Response>
    {
        return await this.fetch({

        });
    }

    public save(): void
    {
        // Not implemented
    }

    // #endregion Actions

    private fetch(options: IModelRequestOptions | null = {}, queryParams: IModelRequestQueryParams = {}): Promise<void | Request | Response>
    {
        // Check for query params
        for (let key in queryParams) {
            this.builder.qp(key, queryParams[key]);
        }

        // Query params
        const url: string = this.builder
            .qp('limit', this.limit)
            .qp('page', this.page)
            .url;

        // Setup request
        this.request = new Request(url, {
            dataKey: this.dataKey,
        });

        // Request
        return this.request
            .fetch()

            // Save data
            .then((request: Request) => {
                console.log("Sup request", request);
                console.log("Sup data", request.data);

                this.attributes = this.dataKey !== undefined
                    ? request.data[this.dataKey]
                    : request.data;

                return this;
            })

            // Parse to collection
            .then((self: any) => {
                // console.log('fuckin data', self);
                return this;
            })

            // Trigger events
            .then(() => {
                this.dispatch('complete', this);
            });
    }

}
