
/**
 * Model Request Options
 *
 * @type interface
 */
export interface IModelRequestOptions
{
    id?: number;
    includes?: string[];
}


/**
 * Model Request Query Params
 *
 * Any type of query params
 *
 * @type interface
 */
export interface IModelRequestQueryParams
{
    [key: string]: any;
}
