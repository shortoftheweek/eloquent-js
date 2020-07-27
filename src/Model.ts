
import ActiveRecord from './ActiveRecord';
import Request from './Http/Request';
import {
    IAttributes,
    IModelRequestOptions,
    IModelRequestQueryParams
} from './Interfaces';

/**
 * [Eloquent description]
 *
 * @type {[type]}
 */
export default class Model extends ActiveRecord
{
    /**
     * Hydrate
     *
     * @type {any}
     */
    public static hydrate<T>(attributes: any = {}, options: object = {}): any
    {
        // Instantiate collection
        const collection = new this(options);

        // Add models to collection
        collection.set(attributes);

        // Add options to collection
        collection.options(options);

        return collection;
    }

    /**
     * Hash of attributes whos current + previous value differ
     *
     * @type {object}
     */
    public changed: object = { };

    /**
     * Default JSON ID attribute
     *
     * @type {string}
     */
    public idAttribute: string = 'id';

    /**
     * List of fields available
     *
     * @type string[]
     */
    public fields: string[] = [];

    /**
     * List of relationships available
     *
     * @type object
     */
    public relationships: object = { };

    /**
     * List of fields available
     *
     * @type string[]
     */
    public rules: string[] = [];

    /**
     * Error during validation
     *
     * @type {any}
     */
    public validationError: any = null;

    /**
     * The key that collection data exists on, e.g.
     *
     * {
     *     data: [ .. ]
     * }
     *
     * @type string
     */
    protected dataKey: string | undefined = undefined;

    /**
     * Instance cache for relationships
     */
    private relationshipCache = { };

    /**
     * Constructor
     */
    constructor(attributes: any = { }, options: any = { })
    {
        super(options);

        // Set defaults
        this.changed = { };
        this.cid = this.cidPrefix + Math.random().toString(36).substr(2, 5);

        // Set attributes
        this.set(attributes);
    }

    /**
     * Set attributes by hashmap
     *
     * @note Unsure if we should delete existing relationships
     * or `set` on them. I think we have failures with the `set`
     *
     * @param object = {} hash
     *
     * @return ActiveRecord
     */
    public set(hash: IAttributes = {}): any
    {
        // This forces a reset of relationship caches
        for (let key in hash) {
            // @ts-ignore
            if (this.relationshipCache[key]) {
                // @ts-ignore
                delete this.relationshipCache[key];
            }
        }

        super.set(hash);

        // Check attributes if everything looks ok
        if (this.attributes.data && this.attributes.data.length) {
            console.warn('This model is incorrectly getting collection data.', this);
        }

        // Update any relationship caches that exist
        // Don't delete them, as to save references
        // for (let key in hash) {
        //     if (this.relationshipCache[key]) {
        //         this.relationshipCache[key].set(hash[key]);
        //     }
        // }

        return this;
    }

    /**
     * Save model
     *
     * @todo There so much to do to fix this
     *
     * @param  {any = {}} options
     * @param  {any = {}} queryParams
     * @return {any}
     */
    public save(attributes: any): any
    {
        // Query params
        const url: string = this.builder
            .identifier(this.id)
            .url;

        // Headers
        this.setHeader('Content-Type', 'application/json; charset=utf-8');

        // Attributes
        const body: any = attributes || this.attributes;
        const headers: any = this.headers;
        const method: string = this.id ? 'PUT' : 'POST';

        // Setup request
        var request = new Request(url);

        // Request (method, body headers)
        return request
            .fetch(method, body, headers)

            // Save data
            .then((request: Request) => {
                // Set data
                // this.set(this.dataKey !== undefined
                //     ? request.data[this.dataKey]
                //     : request.data);

                // // Set options
                // this.options({
                //     meta: request.data.meta,
                // });

                // // Events
                // this.dispatch('fetched', this);

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

    /**
     * Public generic fetch method
     *
     * @param  {IModelRequestOptions | null = {}} options
     * @param  {IModelRequestQueryParams = {}} queryParams
     * @return {Promise}
     */
    public async fetch(options: IModelRequestOptions | null = {}, queryParams: IModelRequestQueryParams = {}) // Promise<void | Request | Response>
    {
        // Query params
        this.builder.identifier(this.id);

        // Check if ID exists
        if (!this.id) {
            console.warn('Fetching model without ID is likely incorrect behavior.');
        }

        // Fetch
        return await super.fetch(options, queryParams);
    }

    /**
     * Delete Model
     *
     * @todo There's a ton to do here too
     */
    public delete(): any
    {
        // Query params
        const url: string = this.builder
            .identifier(this.id)
            .url;

        // Headers
        this.setHeader('Content-Type', 'application/json; charset=utf-8');

        // Attributes
        const body: any = null;
        const headers: any = this.headers;
        const method: string = 'DELETE';

        // Setup request
        var request = new Request(url);

        // Request (method, body headers)
        return request
            .fetch(method, body, headers)

            // Save data
            .then((request: Request) => {
                return this;
            })

            // Trigger events
            .then(() => {
                this.dispatch('complete', this);
            })

            // Error
            .catch((e) => {
                console.log('We failed to delete', e);
            });
    }


    // Relationships
    // ------------------------------------------------------------------------

    public hasOne(relationshipName: string, relationshipClass: any): any
    {
        if (this.relationshipCache[relationshipName]) {
            return this.relationshipCache[relationshipName];
        }

        var content = this.attr(relationshipName) || {};
        var model = new relationshipClass(content);

        return this.relationshipCache[relationshipName] = model;
    }

    public hasMany(relationshipName: string, relationshipClass: any): any
    {
        if (this.relationshipCache[relationshipName]) {
            return this.relationshipCache[relationshipName];
        }

        const content: any = this.attr(relationshipName) || { data: [] };
        const collection: any = relationshipClass.hydrate(content.data || content);

        return this.relationshipCache[relationshipName] = collection;
    }

    /**
     * Validates data
     *
     * @todo Not implemented
     *
     * @return boolean
     */
    private validate(attributes: any, options: any = {}): boolean
    {
        if (!this.validate || !options.validate) {
            return true;
        }

        // const attributes:

        return false;
    }
}
