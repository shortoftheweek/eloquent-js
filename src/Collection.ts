
import CollectionIterator from './CollectionIterator';
import ActiveRecord from './ActiveRecord';
import Model from './Model';


/**
 * [Collection description]
 *
 * @type {[type]}
 */
export default class Collection extends ActiveRecord
{

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
    public model: any = Model;

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
     * List of models
     *
     * @type {Model[]}
     */
    private models: Model[] = [];

    /**
     * Constructor
     *
     * @param {any = []} models
     * @param {object = {}} options
     */
    constructor(models: Model[] = [], options: object = {})
    {
        super(options);

        // Set defaults
        this.cid = this.cidPrefix + Math.random().toString(36).substr(2, 5);

        // Set attributes
        this.add(models, options);
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
            if (!(model instanceof Model)) {
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

    public remove(models: Model[] | Model | object, options: object = {}): Collection
    {
        // Not implemented

        return this;
    }

    public set(models: Array<object>, options: object = {}): any
    {
        // Not implemented
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

    public where(attributes: object = {}, first: boolean = false): any
    {
        // Not implemented
    }

    public findWhere(attributes: object = {}): any
    {
        // Not implemented
    }

    public sort(options: object = {}): any
    {
        // Not implemented
    }

    public pluck(attributes: object = {}): any
    {
        // Not implemented
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

    public clone(attributes: object = {}): any
    {
        // Not implemented
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

    private _reset(): void
    {
        // Not implemented
    }

    private _prepareModel(attributes: object = {}): any
    {
        // Not implemented
    }

    private _removeModels(attributes: object = {}): any
    {
        // Not implemented
    }

    private _isModel(attributes: object = {}): any
    {
        // Not implemented
    }

    private _addReference(attributes: object = {}): any
    {
        // Not implemented
    }

    private _removeReference(attributes: object = {}): any
    {
        // Not implemented
    }

    private _onModelEvent(attributes: object = {}): any
    {
        // Not implemented
    }

}
