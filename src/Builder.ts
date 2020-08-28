
import ActiveRecord from './ActiveRecord';

/**
 * Builder
 *
 * @type
 */
export default class Builder
{

    /**
     * Base Url
     *
     * @type string
     */
    public get baseUrl(): string
    {
        return this.activeRecord.baseUrl;
    }

    /**
     * Endpoint
     *
     * @type string
     */
    public get endpoint(): string
    {
        return this.activeRecord.modifiedEndpoint || this.activeRecord.endpoint;
    }

    /**
     * ID
     *
     * @type string
     */
    public id: string = '';

    /**
     * List of includes
     *
     * @type string[]
     */
    public includes: string[] = [ ];

    /**
     * List of query params
     *
     * @type object
     */
    public queryParams: any = {};

    /**
     * Reference to ActiveRecord we're building for
     *
     * @type {ActiveRecord}
     */
    private activeRecord: ActiveRecord;

    /**
     * Constructor
     */
    constructor(activeRecord: ActiveRecord)
    {
        this.activeRecord = activeRecord;
    }

    /**
     * Query params
     *
     * @todo Move to a builder?
     *
     * @type string
     */
    public get queryParamsAsString(): string
    {
        let str: string = '';

        // Combine query params
        // for (let [key, value] of this.queryParams) {
        for (let key in this.queryParams) {
            let value = this.queryParams[key];

            if (value != null && value != '') {
                str += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(value);
            }
        }

        // Add includes
        if (this.includes.length) {
            str += '&include=' + this.includes.join(',');
        }

        return str;
    }

    /**
     * Requestable URL
     *
     * @return string
     */
    public get url(): string
    {
        const baseUrl: string = this.baseUrl;
        const endpoint: string = this.endpoint;
        const queryParamStr: string = this.queryParamsAsString;

        let urlBuilder = '';

        // Root API URI
        urlBuilder += baseUrl;
        urlBuilder += endpoint[0] === '/' ? endpoint : '/' + endpoint;

        // Check for ID
        if (this.id !== '') {
            urlBuilder += '/' + this.id;
        }

        // Separate query string
        urlBuilder += '?' + queryParamStr;

        return urlBuilder;
    }

    /**
     * Add an ID
     *
     * @param  number id
     * @return Builder
     */
    public identifier(id: string | number): Builder
    {
        this.id = id.toString();
        return this;
    }

    /**
     * Add an include
     *
     * @param  string  $value
     * @return Builder
     */
    public include(value: string): Builder
    {
        this.includes.push(value);
        return this;
    }

    /**
     * Add a query parameter
     *
     * @param  string  key
     * @param  string  value
     * @return Builder
     */
    public queryParam(key: string, value: string | number): Builder
    {
        this.queryParams[key] = value;
        return this;
    }

    /**
     * Short hand for query parameter
     *
     * @param  string key
     * @param  string | number value
     * @return Builder
     */
    public qp(key: string, value: string | number): Builder
    {
        return this.queryParam(key, value);
    }

}
