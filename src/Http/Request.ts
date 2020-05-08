
import Core from '../Core';
import fetch from 'node-fetch';
import {
    IAttributes,
} from '../Interfaces';

/**
 * Request
 *
 * @todo
 */
export default class Request extends Core
{

    /**
     * Parsed data from response
     *
     * @type {object}
     */
    public data: IAttributes = { };

    /**
     * Where to find the data
     *
     * @type {string}
     */
    public dataKey: string = '';

    /**
     * Last fetch
     *
     * @type {Promise<Repsonse>}
     */
    public request?: Promise<Request | Response>;

    /**
     * Response from fetch
     *
     * @type Response
     */
    public response?: Response;

    /**
     * @type {string}
     */
    public url: string;

    /**
     * Constructor
     */
    constructor(url: string, params: any = {})
    {
        super();

        this.dataKey = params.dataKey;
        this.url = url;
    }

    /**
     * Actually fetch the data
     */
    public fetch(): Promise<Request>
    {
        this.dispatch('fetch: before');

        var response = fetch(this.url, {
            // body: null,
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            // method: 'GET',
            // mode: 'cors',
            redirect: 'follow',
        });

        return response
            .then(this.beforeParse.bind(this))
            .then(this.parse.bind(this))
            .then(this.afterParse.bind(this))
            .then(this.afterFetch.bind(this));
    }

    /**
     * Before parsing data
     *
     * @todo Check if we have valid JSON
     * @todo Check if the request was an error
     *
     * @param {any} x [description]
     */
    private beforeParse(response: any): Request
    {
        // Trigger
        this.dispatch('parse:before');

        // Save
        this.response = response;

        return this;
    }

    /**
     * Parse data
     *
     * @param {any} x [description]
     */
    private async parse(request: Request)
    {
        // Trigger
        this.dispatch('parse:parsing');

        // Set data
        if (request.response) {
            this.data = await request.response.json();
        }

        // Trigger
        this.dispatch('parse', this.data);

        return request;
    }

    /**
     * After data parsed
     *
     * @param {any} x [description]
     */
    private afterParse(request: Request): Request
    {
        // Trigger
        this.dispatch('parse:after');

        return request;
    }

    /**
     * After data fetched
     *
     * @param {any} x [description]
     */
    private afterFetch(request: Request) : Request
    {
        // Trigger
        this.dispatch('fetch', request.data);

        // Trigger
        this.dispatch('fetch:after');

        return request;
    }

}
