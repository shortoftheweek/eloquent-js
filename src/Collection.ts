import ActiveRecord from './ActiveRecord';
import CollectionIterator from './CollectionIterator';
import Model from './Model';
import EloquentRequest from './Http/Request';
import {
    IAttributes,
    IAxiosResponse,
    IAxiosSuccess,
    ICollectionMeta,
    IDispatcherEvent,
    IRequest,
    IModelRequestOptions,
    IModelRequestQueryParams,
    IPagination,
    ISortOptions,
} from './Interfaces';

/**
 * [Collection description]
 *
 * 'meta': {
 *     'pagination': {
 *         'total': 1938,
 *         'count': 15,
 *         'per_page': 15,
 *         'current_page': 1,
 *         'total_pages': 130,
 *         'links': {
 *             'next': 'http://api.sotw.com/v1/film?page=2'
 *         }
 *     }
 * }
 *
 */
export default class Collection extends ActiveRecord implements Iterable<Model>
{
    /**
     * Hydrate a collection full of models
     *
     * @type Model[]
     */
    public static hydrate<T>(models: Model[] = [], options: object = {}): any {
        // Instantiate collection
        const collection = new this(options);

        // Add models to collection
        collection.add(models);

        // Add options to collection
        collection.options(options);

        return collection;
    }

    /**
     * Return count of models
     *
     * @todo Make sure this isn't caching
     *
     * @return number
     */
    public get length(): number {
        return this.models.length;
    }

    /**
     * @todo Replace this based on Model
     * @return {string}
     */
    public get modelId(): string {
        return 'id';
    }

    /**
     * Pagination
     *
     * @return IPagination
     */
    public get pagination(): IPagination {
        return this.meta.pagination;
    }

    /**
     * This allows us to iterate through a list of subobjects
     * when we use our ".at(x)" command. So if on the collection,
     * we wanted to iterate and get:
     *
     *     .at(0).receiver.person
     *
     * We could set this property to be:
     *
     *     ['receiver', 'person']
     *
     * Which we could then call as:
     *
     *     at(0) === at(0).receiver.person
     *
     * It's sort of like a disguise for the at(x) call
     *
     * @type string[]
     */
    public atRelationship: string[] = [];

    /**
     * Get the next row
     * Adjacent to first/last
     *
     * @type number
     */
    public index: number = 0;

    /**
     * Meta data associated with collection
     *
     * @type ICollectionMeta
     */
    public meta: ICollectionMeta = {
        pagination: {
            total: 0,
            count: 15,
            per_page: 15,
            current_page: 1,
            total_pages: 1,
            links: {},
        },
    };

    /**
     * Model object instantiated by this collection
     * This should be replaced by subclass
     *
     * @type any
     */
    // @ts-ignore Because webpack attempts to autoload this
    public model: Model = Model;

    /**
     * List of models
     *
     * @type Model[]
     */
    public models: Model[] = [];

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
     * Change key we sort on
     *
     * @type string
     */
    protected sortKey: string = 'id';

    /**
     * Constructor
     *
     * We specifically don't set models here because the Model doesn't exist
     * until constructor is done. We must use hydrate for that. Don't add data.
     *
     * If we do it early, we won't get FilmModels, we'll get Models.
     *
     * @param {object = {}} options
     */
    constructor(options: any = {}) {
        super(options);

        // Default builder
        this.builder.qp('limit', this.limit).qp('page', this.page);

        // Set default content type header
        this.setHeader('Content-Type', 'application/json; charset=utf8');

        // Set defaults
        this.cid = this.cidPrefix + Math.random().toString(36).substr(2, 5);

        // Custom options
        if (options.atRelationship) {
            this.atRelationship = options.atRelationship;
        }
    }

    /**
     * Convert collection to JSON
     *
     * @return {any}
     */
    public toJSON(): object {
        return JSON.parse(JSON.stringify(this.models));
    }

    /**
     * Fetch next page with last set of options
     *
     * @return {any}
     */
    public async fetchNext(append: boolean = false): Promise<EloquentRequest> {
        var options = Object.assign({}, this.lastRequest.options);
        var qp = Object.assign(
            {},
            this.builder.queryParams,
            this.lastRequest.queryParams
        );

        // Increase page number
        qp.page = parseFloat(qp.page) + 1;

        // Merge
        options.merge = append;

        // Fetch
        return await this._fetch(
            options,
            qp,
            this.lastRequest.method,
            this.lastRequest.body,
            this.lastRequest.headers
        );
    }

    /**
     * Sync
     *
     * @todo
     *
     * @return {any}
     */
    public sync(): any {
        // Not implemented
        // call parent
    }

    /**
     * Add or prepend Model(s) to our list
     *
     * @param  {Model[] | Model | object} model
     * @param  {any = {}} options
     * @return Collection
     */
    public add(model: Model[] | Model | object, options: any = {}): Collection {
        if (model == undefined) {
            return this;
        }

        const models: any = Array.isArray(model) ? model : [model];

        // Iterate through models
        models.forEach((model: any) => {
            // Data supplied is an object that must be instantiated
            if (!(model instanceof Model)) {
                // @ts-ignore
                model = new this.model(model);
                // model = this.createModel(model);

                // Set parent reference
                model.parent = this;

                // Set headers to match our model
                model.headers = this.headers;

                // Check the modified endpoint
                if (this.referenceForModifiedEndpoint) {
                    model.useModifiedEndpoint(this.referenceForModifiedEndpoint);
                }
            }

            if (options.prepend) {
                this.models.unshift(model);
            } else {
                this.models.push(model);
            }
        });

        // Event for add
        this.dispatch('change', { from: 'add' });
        this.dispatch('add');

        return this;
    }

    /**
     * Remove a model, a set of models, or an object
     *
     * @param  {Model[] | Model | object} model
     * @param  {object = {}} options
     * @return {Collection}
     */
    public remove(
        model: Model[] | Model | object,
        options: any = {}
    ): Collection {
        let i: number = 0;
        let ii: number = 0;
        const items: any = Array.isArray(model) ? model : [model];

        // Take the first model in our list and iterate through our local
        // models. If we are successful, call recursive
        for (ii = 0; ii < items.length; ii++) {
            i = 0;
            while (i < this.models.length) {
                if (this.models[i] == items[ii]) {
                    this.models.splice(i, 1);
                } else {
                    ++i;
                }
            }
        }

        // Event for add
        this.dispatch('change', { from: 'remove' });
        this.dispatch('remove');

        return this;
    }

    /**
     * Reset and add new models
     *
     * @todo Review this
     *
     * @param  {Model[] | Model | object} model
     * @param  {any = {}} options
     * @return {Collection}
     */
    public set(model: Model[] | Model | object, options: any = {}): Collection {
        if (!options || (options && options.merge != true)) {
            this.reset();
        }

        // Check for `meta` on set, this sometimes happens
        // if we assign an entire bootstrapped JSON object
        // to the collection
        if (model && model.hasOwnProperty('meta')) {
            // @ts-ignore
            this.meta = model.meta;
        }

        // Check for `meta` on set, this sometimes happens
        // if we assign an entire bootstrapped JSON object
        // to the collection
        if (model && model.hasOwnProperty('data')) {
            // @ts-ignore
            this.add(model.data);
        } else {
            // @ts-ignore
            this.add(model);
        }

        // Event for add
        this.dispatch('set');

        return this;
    }

    /**
     * Reset
     *
     * @todo Might want to do more with this
     * @return {Collection}
     */
    public reset(): Collection {
        this.models = [];

        // Event for add
        this.dispatch('change', { from: 'reset' });
        this.dispatch('reset');

        return this;
    }

    /**
     * Clear
     *
     * Alias for Reset
     */
    public clear(): Collection {
        return this.reset();
    }

    /**
     * Count
     *
     * @return Number
     */
    public count(): number {
        return this.length;
    }

    /**
     * Delete Model
     *
     * @todo There's a ton to do here too
     */
    public delete(attributes: any = null) {
        // Query params
        const url: string = this.builder.identifier(
            this.id || (attributes ? attributes.id : '')
        ).getUrl();

        // Check for identifier
        if (this.builder.id) {
            var model = this.findWhere(attributes);
            this.remove(model);
        }

        // Attributes
        const body: any = null;
        const headers: any = this.headers;
        const method: string = 'DELETE';

        return this._fetch(null, {}, method, body, headers);
    }

    /**
     * Append Model(s) to end of list
     *
     * @param  {Model[] | Model | object} model
     * @param  {object = {}} options
     * @return {Collection}
     */
    public push(
        model: Model[] | Model | object,
        options: object = {}
    ): Collection {
        this.add(model, options);

        return this;
    }

    /**
     * Remove model from end of list
     *
     * @param  {object = {}} options
     * @return Collection
     */
    public pop(options: object = {}): Collection {
        const model: Model = this.at(this.length - 1);

        return this.remove(model, options);
    }

    /**
     * Add Model(s) to beginning of list
     *
     * @param  {Model[] | Model | object} model
     * @param  {object = {}} options
     * @return {any}
     */
    public unshift(
        model: Model[] | Model | object,
        options: object = {}
    ): Collection {
        return this.add(model, Object.assign({ prepend: true }, options));
    }

    /**
     * Remove first object
     *
     * @param  {object = {}} options
     * @return {any}
     */
    public shift(options: object = {}): Collection {
        const model: Model = this.at(0);

        return this.remove(model, options);
    }

    /**
     * Cut up collection models
     *
     * @return Model[]
     */
    public slice(...params: any): Model[] {
        return <Model[]>Array.prototype.slice.apply(this.models, params);
    }

    /**
     * Get model by ID
     *
     * @param  string | number  id
     * @return Model | undefined
     */
    public get(query: Model | string | number): Model | undefined {
        if (query == null) {
            return void 0;
        }

        return this.where(
            {
                [this.modelId]: query instanceof Model ? query.cid : query,
            },
            true
        );
    }

    /**
     * Checks if we have an object or Model
     *
     * @param  Model | object  obj
     * @return boolean
     */
    public has(obj: Model | string | number): boolean {
        return this.get(obj) != undefined;
    }

    /**
     * Get model at index
     *
     * @param  {number = 0} index
     * @return Model
     */
    public at(index: number = 0): Model {
        if (index < 0) {
            index += this.length;
        }

        // Get model
        var item: any = this.models[index];

        // Transform through
        if (this.atRelationship && this.atRelationship.length) {
            this.atRelationship.forEach((key) => (item = item[key]));
        }

        return item;
    }

    /**
     * Get first item
     *
     * @return {Model}
     */
    public first(): Model {
        return this.at(0);
    }

    /**
     * Get last item
     *
     * @return {Model}
     */
    public last(): Model {
        return this.at(this.length - 1);
    }

    public next() {
        // We have reached the end
        // if (this.index >= this.length) {
        //     return false;
        // }

        // Get model
        var model = this.at(++this.index);

        return model;
    }

    public previous() {
        // We have reached the beginning
        // if (this.index <= 0) {
        //     return false;
        // }

        // Advance
        return this.at(--this.index);
    }

    public current() {
        // Advance
        return this.at(this.index);
    }

    /**
     * Comparing hard object attributes to model attr
     *
     * @param  {any = {}} attributes
     * @param  {boolean = false} first
     * @return {any}
     */
    public where(attributes: any = {}, first: boolean = false): any /* Self */ {
        const constructor: any = this.constructor;
        const collection = new constructor();

        // @todo, this code sucks but I'm not spending all day here
        this.models.map((model: any) => {
            const intersection: string[] = Object.keys(model.attributes).filter(
                (k: string) => k in attributes && model.attr(k) == attributes[k]
            );

            if (intersection.length) {
                collection.add(model);
            }
        });

        return first ? collection.first() : collection;
    }

    /**
     * First where
     * @param  {object = {}} attributes
     * @return Model
     */
    public findWhere(attributes: object = {}): Model {
        return this.where(attributes, true);
    }

    /**
     * Search by CID
     * @param  {string} cid
     * @return {Model}
     */
    public findByCid(cid: string): Model | undefined {
        return this.findWhere({ cid });
    }

    /**
     * Each
     * @param  {string} cid
     * @return {Model}
     */
    public each(predicate: any): this {
        this.models.forEach(predicate);
        return this;
    }

    /**
     * Alias for Where
     *
     * @param  {string} cid
     * @return {Model}
     */
    public filter(predicate: any): Collection {
        return this.where(predicate);
    }

    /**
     * Sorting models by key or in reverse
     *
     * We have a basic `sortKey` defined on the collection, but
     * can also pass in an object with `key` and `reverse` on it
     *
     * @param  {ISortOptions|null = null} options
     * @return {Collection}
     */
    public sort(options: ISortOptions | null = null): Collection {
        let key: string = this.sortKey;

        // Sort options
        if (options !== null) {
            key = options.key;
        }

        // Sort
        this.models = this.models.sort((a: any, b: any) => {
            return options && options.reverse
                ? (a.attr(key) - b.attr(key)) * -1
                : (a.attr(key) - b.attr(key)) * 1;
        });

        return this;
    }

    /**
     * Pull out an attribute from our models
     *
     * Example:
     *     collection.pluck('name');
     *
     *     ['Ashley', 'Briana', 'Chloe', ...]
     *
     * @param  {string} attribute
     * @return {any}
     */
    public pluck(attribute: string): any {
        return this.models.map((model) => model.attr(attribute));
    }

    /**
     * Clone current object
     *
     * @param {object = {}} attributes
     * @return Collection
     */
    public clone(attributes: object = {}) {
        // @ts-ignore
        const instance = new this.constructor();
        instance.add(this.toJSON());

        return instance;
    }

    /**
     * Return an interator for values based on this collection
     *
     * @return CollectionIterator
     */
    public values(): CollectionIterator {
        return new CollectionIterator(this, CollectionIterator.ITERATOR_VALUES);
    }

    /**
     * Return an interator for keys based on this collection
     *
     * @return CollectionIterator
     */
    public keys(attributes: object = {}): CollectionIterator {
        return new CollectionIterator(this, CollectionIterator.ITERATOR_KEYS);
    }

    /**
     * Return an interator for entries (key + value) based on this collection
     *
     * @return CollectionIterator
     */
    public entries(attributes: object = {}): CollectionIterator {
        return new CollectionIterator(
            this,
            CollectionIterator.ITERATOR_KEYSVALUES
        );
    }

    /**
     * Override internal fetch so we can catch authorization
     * errors and automatically attempt to refresh tokens
     */
    protected _fetch(
        options: IModelRequestOptions | null = {},
        queryParams: IModelRequestQueryParams = {},
        method: any = null,
        body: any = null,
        headers: any = null
    ): any {
        const cacheKey: string = this.b.getUrl();

        // If our response is still loading, return a promise and add a subscriber
        if (this.isCachePending(cacheKey)) {
            return new Promise<any>((resolve, reject) => {
                this.addCacheSubscriber(cacheKey, resolve, reject, this);
            });
        }

        // Start cache processing while we wait for results from server (key, value, isComplete)
        this.cache(cacheKey, true);

        /*
        * By omitting this, we are only using short-term cache to prevent thundering herd.
        * We could enable this to have extended cache, but we'd need to be mindful about
        * busting said cache.
        * else if (this.isCached(cacheKey)) {
        *     return new Promise((resolve: any, reject: any) =>
        *     {
        *         this.addCacheSubscriber(cacheKey, resolve, reject);
        *     });
        * }
        */

        // Fetch from server
        return super
            ._fetch(options, queryParams, method, body, headers)

            // Send response to subscribers
            .then((request: EloquentRequest) => {
                const data: any = request.responseData;
                const method: string = request.method || 'get';

                // Save actual cache response (key, value, isComplete)
                this.cache(cacheKey, request, true);

                // Send all of our subscribers the response through `resolve`
                this.getCache(cacheKey)
                    .subscribers
                    .forEach((subscriber: any) => {
                        subscriber.collection.setAfterResponse(request);
                        subscriber.collection.dispatch('complete', request);
                        subscriber.collection.dispatch('complete:' + method, request);
                        subscriber.resolve(request);
                    });

                // Clear all listeners
                this.clearCacheSubscribers(cacheKey);

                return request;
            })

            // Send error to subscribers
            .catch((request: EloquentRequest) => {
                // Error
                this.dispatch('error', request);

                // Save actual cache response (key, value, isComplete)
                this.cache(cacheKey, request, true);

                // Send all of our subscribers the response through `resolve`
                this.getCache(cacheKey)
                    .subscribers
                    .forEach((subscriber: any) =>
                        subscriber.reject(request)
                    );

                // Clear
                this.clearCacheSubscribers(cacheKey);

                throw request;
            });
    }

    /**
     * Determine if an object is infact a model
     *
     * @param  {any} model
     * @return {boolean}
     */
    private _isModel(model: any): boolean {
        return model instanceof Model;
    }

    /**
     * Iterator
     */
    [Symbol.iterator](): Iterator<any> {
        return new CollectionIterator(this, CollectionIterator.ITERATOR_VALUES);
    }
}
