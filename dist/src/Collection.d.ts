import ActiveRecord from './ActiveRecord';
/**
 * [Collection description]
 *
 * @type {[type]}
 */
export default class Collection extends ActiveRecord {
    /**
     * Model object instantiated by this collection
     *
     * @type {any}
     */
    model: any;
    /**
     * The key that collection data exists on, e.g.
     *
     * {
     *     data: [ .. ]
     * }
     *
     * @type string
     */
    protected dataKey: string | undefined;
    /**
     * @todo
     *
     * @return {number} [description]
     */
    get length(): number;
    toJSON(options?: object): any;
    sync(): any;
    add(models: Array<object>, options?: object): any;
    remove(models: Array<object>, options?: object): any;
    set(models: Array<object>, options?: object): any;
    reset(models: Array<object>, options?: object): any;
    push(model: object, options?: object): any;
    pop(model: object, options?: object): any;
    unshift(model: object, options?: object): any;
    shift(options?: object): any;
    slice(): any;
    has(obj: any): any;
    at(index?: number): any;
    where(attributes?: object, first?: boolean): any;
    findWhere(attributes?: object): any;
    sort(options?: object): any;
    pluck(attributes?: object): any;
    create(model?: object, options?: object): any;
    parse(response: Response, options?: object): any;
    clone(attributes?: object): any;
    modelId(attributes?: any, idAttribute?: string): any;
    values(): any;
    keys(attributes?: object): any;
    entries(attributes?: object): any;
    private _reset;
    private _prepareModel;
    private _removeModels;
    private _isModel;
    private _addReference;
    private _removeReference;
    private _onModelEvent;
}
