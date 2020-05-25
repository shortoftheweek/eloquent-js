import Core from '../Core';
import { IAttributes } from '../Interfaces';
/**
 * Request
 *
 * @todo
 */
export default class Request extends Core {
    /**
     * Parsed data from response
     *
     * @type {object}
     */
    data: IAttributes;
    /**
     * Where to find the data
     *
     * @type {string}
     */
    dataKey: string;
    /**
     * Last fetch
     *
     * @type {Promise<Repsonse>}
     */
    request?: Promise<Request | Response>;
    /**
     * Response from fetch
     *
     * @type Response
     */
    response?: Response;
    /**
     * @type {string}
     */
    url: string;
    /**
     * Constructor
     */
    constructor(url: string, params?: any);
    /**
     * Actually fetch the data
     */
    fetch(): Promise<Request>;
    /**
     * Before parsing data
     *
     * @todo Check if we have valid JSON
     * @todo Check if the request was an error
     *
     * @param {any} x [description]
     */
    private beforeParse;
    /**
     * Parse data
     *
     * @param {any} x [description]
     */
    private parse;
    /**
     * After data parsed
     *
     * @param {any} x [description]
     */
    private afterParse;
    /**
     * After data fetched
     *
     * @param {any} x [description]
     */
    private afterFetch;
}
