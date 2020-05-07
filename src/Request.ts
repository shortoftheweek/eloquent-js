
import Core from './Core';

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
    public data?: object;

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
    public async fetch()
    {
        this.dispatch('fetch: before');

        return this.request = fetch(this.url, {
            // body: null,
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            // method: 'GET',
            // mode: 'cors',
            // redirect: 'follow',
        })
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
    private beforeParse(response: Response) : Response
    {
        // Trigger
        this.dispatch('parse:before');

        return response;
    }

    /**
     * Parse data
     *
     * @param {any} x [description]
     */
    private async parse(response: Response)
    {
        // Trigger
        this.dispatch('parse:parsing');

        // Set data
        this.data = await response.json();

        // Trigger
        this.dispatch('parse', this.data);

        return response;
    }

    /**
     * After data parsed
     *
     * @param {any} x [description]
     */
    private afterParse(response: Response) : Response
    {
        // Trigger
        this.dispatch('parse:after');

        return response;
    }

    /**
     * After data fetched
     *
     * @param {any} x [description]
     */
    private afterFetch(response: Response) : Request
    {
        // Trigger
        this.dispatch('fetch', this.data);

        // Trigger
        this.dispatch('fetch:after');

        return this;
    }

}
