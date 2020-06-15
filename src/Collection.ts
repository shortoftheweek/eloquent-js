
import CollectionIterator from './CollectionIterator';
import ActiveRecord from './ActiveRecord';
import Model from './Model';
import * as _ from 'lodash';
import {
    IAttributes,
    ICollectionMeta,
    IPagination,
    ISortOptions,
} from './Interfaces';


/**
 * [Collection description]
 *
 * "meta": {
 *     "pagination": {
 *         "total": 1938,
 *         "count": 15,
 *         "per_page": 15,
 *         "current_page": 1,
 *         "total_pages": 130,
 *         "links": {
 *             "next": "http://api.sotw.com/v1/film?page=2"
 *         }
 *     }
 * }
 *
 */
export default class Collection extends ActiveRecord implements Iterable<Model>
{

    //public static hydrate<T>(models: Model[] = [], options: object = {}): any
    public static hydrate<T>(models: Model[] = [], options: object = {}): any
    {
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
     * @return number
     */
    public get length(): number
    {
        return this.models.length;
    }

    /**
     * @todo Replace this based on Model
     * @return {string}
     */
    public get modelId(): string
    {
        return 'id';
    }

    /**
     * Model object instantiated by this collection
     *
     * @type {any}
     */
    // @ts-ignore Because webpack attempts to autoload this
    public model: Model = Model;

    /**
     * Pagination
     *
     * @return IPagination
     */
    public get pagination(): IPagination
    {
        return this.meta.pagination;
    }

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
     * @type {string}
     */
    protected sortKey: string = 'id';

    /**
     * Meta data associated with collection
     *
     * @type {object}
     */
    protected meta: ICollectionMeta = {
        pagination: {
            total: 0,
            count: 15,
            per_page: 15,
            current_page: 1,
            total_pages: 1,
            links: {

            },
        },
    };

    /**
     * List of models
     *
     * @type {Model[]}
     */
    protected models: any[] = [];

    /**
     * Constructor
     *
     * @param {any = []} models
     * @param {object = {}} options
     */
    constructor(options: object = {})
    {
        super(options);

        // Set defaults
        this.cid = this.cidPrefix + Math.random().toString(36).substr(2, 5);
    }

    /**
     * Convert collection to JSON
     *
     * @return {any}
     */
    public toJSON(): object
    {
        return JSON.parse(JSON.stringify(this.models));
    }

    /**
     * Sync
     *
     * @todo
     *
     * @return {any}
     */
    public sync(): any
    {
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
    public add(model: Model[] | Model | object, options: any = {}): Collection
    {
        const models: any = Array.isArray(model)
            ? model
            : [model];

        // Iterate through models
        models.forEach((model: any) => {
            // Data supplied is an object that must be instantiated
            if (!(model instanceof Model)) {
                // @ts-ignore
                model = new this.model(model);
            }

            if (options.prepend) {
                this.models.unshift(model);
            }
            else {
                this.models.push(model);
            }
        });

        return this;
    }

    /**
     * Apply an object to change options and set meta
     *
     * @param  {any} options
     * @return {Collection}
     */
    public options(options: any): Collection
    {
        // Set metadata
        if (options.meta) {
            this.meta = options.meta;
        }

        return this;
    }

    /**
     * Remove a model, a set of models, or an object
     *
     * @param  {Model[] | Model | object} model
     * @param  {object = {}} options
     * @return {Collection}
     */
    public remove(model: Model[] | Model | object, options: any = {}): Collection
    {
        let i: number = 0;
        let ii: number = 0;
        const items: any = Array.isArray(model)
            ? model
            : [model];

        // Take the first model in our list and iterate through our local
        // models. If we are successful, call recursive
        for (ii = 0; ii < items.length; ii++) {
            i = 0;
            while (i < this.models.length) {
                if (this.models[i] === items[ii]) {
                    // Remove from collection
                    this.models.splice(i, 1);
                }
                else {
                    ++i;
                }
            }
        }

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
    public set(model: Model[] | Model | object, options: any = {}): Collection
    {
        this.reset();
        this.add(model);

        return this;
    }

    /**
     * Reset
     *
     * @todo Might want to do more with this
     * @return {Collection}
     */
    public reset(): Collection
    {
        this.models = [];

        return this;
    }

    /**
     * Clear
     *
     * Alias for Reset
     */
    public clear(): Collection
    {
        return this.reset();
    }

    /**
     * Append Model(s) to end of list
     *
     * @param  {Model[] | Model | object} model
     * @param  {object = {}} options
     * @return {Collection}
     */
    public push(model: Model[] | Model | object, options: object = {}): Collection
    {
        this.add(model, options);

        return this;
    }

    /**
     * Remove model from end of list
     *
     * @param  {object = {}} options
     * @return Collection
     */
    public pop(options: object = {}): Collection
    {
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
    public unshift(model: Model[] | Model | object, options: object = {}): Collection
    {
        return this.add(model, Object.assign({ prepend: true }, options));
    }

    /**
     * Remove first object
     *
     * @param  {object = {}} options
     * @return {any}
     */
    public shift(options: object = {}): Collection
    {
        const model: Model = this.at(0);

        return this.remove(model, options);
    }

    /**
     * Cut up collection models
     *
     * @return Model[]
     */
    public slice(...params: any): Model[]
    {
        return <Model[]> Array.prototype.slice.apply(this.models, params);
    }

    /**
     * Get model by ID
     *
     * @param  string | number  id
     * @return Model | undefined
     */
    public get(query: Model | string | number): Model | undefined
    {
        if (query == null) {
            return void 0;
        }

        return this.where({
            [this.modelId]: query instanceof Model ? query.cid : query,
        }, true);
    }

    /**
     * Checks if we have an object or Model
     *
     * @param  Model | object  obj
     * @return boolean
     */
    public has(obj: Model | string | number): boolean
    {
        return this.get(obj) != undefined;
    }

    /**
     * Get model at index
     *
     * @param  {number = 0} index
     * @return Model
     */
    public at(index: number = 0): Model
    {
        if (index < 0) {
            index += this.length;
        }

        return this.models[index];
    }

    /**
     * Get first item
     *
     * @return {Model}
     */
    public first(): Model
    {
        return this.at(0);
    }

    /**
     * Get last item
     *
     * @return {Model}
     */
    public last(): Model
    {
        return this.at(this.length - 1);
    }

    /**
     * Comparing hard object attributes to model attr
     *
     * @param  {any = {}} attributes
     * @param  {boolean = false} first
     * @return {any}
     */
    public where(attributes: any = {}, first: boolean = false): any /* Self */
    {
        // @ts-ignore
        const collection = new this.constructor();

        // @todo, this code sucks but I'm not spending all day here
        _.map(this.models, model => {
            if (_.find(model, attributes)) {
                collection.add(model);
            }
        });

        return first
            ? collection.first()
            : collection;
    }

    /**
     * First where
     * @param  {object = {}} attributes
     * @return Model
     */
    public findWhere(attributes: object = {}): Model
    {
        return this.where(attributes, true);
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
    public sort(options: ISortOptions|null = null): Collection
    {
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
    public pluck(attribute: string): any
    {
        return this.models.map(model => model.attr(attribute));
    }

    // public fetch(options: object = {}): any
    // {
    //     // Not implemented
    // }

    public create(model: object = {}, options: object = {}): any
    {
        // Not implemented
    }

    public parse(response: Response, options: object = {}): any
    {
        // Not implemented
    }

    /**
     * Clone current object
     *
     * @param {object = {}} attributes
     * @return Collection
     */
    public clone(attributes: object = {})
    {
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
    public values(): CollectionIterator
    {
        return new CollectionIterator(this, CollectionIterator.ITERATOR_VALUES);
    }

    /**
     * Return an interator for keys based on this collection
     *
     * @return CollectionIterator
     */
    public keys(attributes: object = {}): CollectionIterator
    {
        return new CollectionIterator(this, CollectionIterator.ITERATOR_KEYS);
    }

    /**
     * Return an interator for entries (key + value) based on this collection
     *
     * @return CollectionIterator
     */
    public entries(attributes: object = {}): CollectionIterator
    {
        return new CollectionIterator(this, CollectionIterator.ITERATOR_KEYSVALUES);
    }

    /**
     * Determine if an object is infact a model
     *
     * @param  {any} model
     * @return {boolean}
     */
    private _isModel(model: any): boolean
    {
        return model instanceof Model;
    }

    /**
     * Iterator
     */
    [Symbol.iterator](): Iterator<Model> {
        return new CollectionIterator(this, CollectionIterator.ITERATOR_VALUES);
    }

}
