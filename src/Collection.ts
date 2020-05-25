
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
     * @todo
     *
     * @return {number} [description]
     */
    public get length(): number
    {
        return 0;
    }

    public toJSON(options: object = {}) : any
    {
        // Not implemented
    }

    public sync() : any
    {
        // Not implemented
        // call parent
    }

    public add(models: Array<object>, options: object = {}) : any
    {
        // Not implemented
    }

    public remove(models: Array<object>, options: object = {}) : any
    {
        // Not implemented
    }

    public set(models: Array<object>, options: object = {}) : any
    {
        // Not implemented
    }

    public reset(models: Array<object>, options: object = {}) : any
    {
        // Not implemented
    }

    public push(model: object, options: object = {}) : any
    {
        // Not implemented
    }

    public pop(model: object, options: object = {}) : any
    {
        // Not implemented
    }

    public unshift(model: object, options: object = {}) : any
    {
        // Not implemented
    }

    public shift(options: object = {}) : any
    {
        // Not implemented
    }

    public slice() : any
    {
        // Not implemented
    }

    // public get(obj: any) : any
    // {
    //     // Not implemented
    // }

    public has(obj: any) : any
    {
        // Not implemented
    }

    public at(index: number = 0) : any
    {
        // Not implemented
    }

    public where(attributes: object = {}, first: boolean = false) : any
    {
        // Not implemented
    }

    public findWhere(attributes: object = {}) : any
    {
        // Not implemented
    }

    public sort(options: object = {}) : any
    {
        // Not implemented
    }

    public pluck(attributes: object = {}) : any
    {
        // Not implemented
    }

    // public fetch(options: object = {}) : any
    // {
    //     // Not implemented
    // }

    public create(model: object = {}, options: object = {}) : any
    {
        // Not implemented
    }

    public parse(response: Response, options: object = {}) : any
    {
        // Not implemented
    }

    public clone(attributes: object = {}) : any
    {
        // Not implemented
    }

    public modelId(attributes: any = {}, idAttribute: string = 'id'): any
    {
        return attributes[idAttribute || this.model.idAttribute];
    }

    public values() : any
    {
        // Not implemented
    }

    public keys(attributes: object = {}) : any
    {
        // Not implemented
    }

    public entries(attributes: object = {}) : any
    {
        // Not implemented
    }

    private _reset() : void
    {
        // Not implemented
    }

    private _prepareModel(attributes: object = {}) : any
    {
        // Not implemented
    }

    private _removeModels(attributes: object = {}) : any
    {
        // Not implemented
    }

    private _isModel(attributes: object = {}) : any
    {
        // Not implemented
    }

    private _addReference(attributes: object = {}) : any
    {
        // Not implemented
    }

    private _removeReference(attributes: object = {}) : any
    {
        // Not implemented
    }

    private _onModelEvent(attributes: object = {}) : any
    {
        // Not implemented
    }

}
