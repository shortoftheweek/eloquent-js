import Builder from './Builder';
import Core from './Core';
import Request from './Http/Request';
import { IAttributes } from './Interfaces';
/**
 * ActiveRecord
 *
 * @type {[type]}
 */
export default class ActiveRecord extends Core {
    /**
     * Data set by the request
     *
     * @type object
     */
    attributes: Map<string, any>;
    /**
     * Base Url for the API
     *
     * @type string
     */
    baseUrl: string;
    /**
     * Local custom key
     *
     * @type {string}
     */
    cid: string;
    /**
     * Endpoint key
     *
     * https://api.sotw.com/v1/{endpoint}
     *
     * @type string
     */
    endpoint: string;
    /**
     * Limit
     *
     * @type number
     */
    limit: number;
    /**
     * Page
     *
     * @type number
     */
    page: number;
    /**
     * Last request
     *
     * @type Request
     */
    request?: Request;
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
    protected cidPrefix: string;
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
     * Model if we provide a specific identifier
     *
     * @return boolean
     */
    protected get isModel(): boolean;
    /**
     * Constructor
     */
    constructor(options?: object);
    /**
     * Get attribute
     *
     * @param  string key
     *
     * @return string
     */
    attr(key: string): string | number | null;
    /**
     * Set attributes by hashmap
     *
     * @param object = {} hash
     *
     * @return ActiveRecord
     */
    set(hash?: IAttributes): ActiveRecord;
    /**
     * Unset attribute
     *
     * @param  string key
     *
     * @return ActiveRecord
     */
    unset(key: string): ActiveRecord;
    /**
     * Converts model to JSON object
     *
     * @return object
     */
    toJSON(): object;
    delete(): void;
    create(): void;
    find(id: number): Promise<void | Request | Response>;
    get(): Promise<void | Request | Response>;
    save(): void;
    private fetch;
}
