
import ActiveRecord from './ActiveRecord';
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
     * Hash of attributes whos current + previous value differ
     *
     * @type {object}
     */
    public changed: object = { };

    /**
     * List of fields available
     *
     * @type string[]
     */
    public fields: string[] = [];

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
     * Error during validation
     *
     * @type {any}
     */
    public validationError: any = null;

    /**
     * Default JSON ID attribute
     *
     * @type {string}
     */
    public idAttribute: string = 'id';

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
    private relationshipCache = {};

    /**
     * Constructor
     */
    constructor(attributes: object = {}, options: object = {})
    {
        super(options);

        // Set defaults
        this.changed = { };
        this.cid = this.cidPrefix + Math.random().toString(36).substr(2, 5);

        // Set attributes
        this.set(attributes);
    }

    // public async fetch(options: IModelRequestOptions | null = {}, queryParams: IModelRequestQueryParams = {}): Promise<void | Request | Response>
    // {
    //     return await this._fetch(options, queryParams);
    // }

    public save(): void
    {

    }

    public delete(): void
    {

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
