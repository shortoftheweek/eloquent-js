import ActiveRecord from './ActiveRecord';
/**
 * [Eloquent description]
 *
 * @type {[type]}
 */
export default class Model extends ActiveRecord {
    /**
     * Hash of attributes whos current + previous value differ
     *
     * @type {object}
     */
    changed: object;
    /**
     * List of fields available
     *
     * @type string[]
     */
    fields: string[];
    /**
     * List of fields available
     *
     * @type string[]
     */
    rules: string[];
    /**
     * List of relationships available
     *
     * @type object
     */
    relationships: object;
    /**
     * Error during validation
     *
     * @type {any}
     */
    validationError: any;
    /**
     * Default JSON ID attribute
     *
     * @type {string}
     */
    protected idAttribute: string;
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
    constructor(attributes?: object, options?: object);
    save(): void;
    delete(): void;
    /**
     * Validates data
     *
     * @todo Not implemented
     *
     * @return boolean
     */
    private validate;
}
