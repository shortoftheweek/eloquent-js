import ActiveRecord from './ActiveRecord';
import Request from './Http/Request';
import { IAttributes, IModelRequestOptions, IModelRequestQueryParams } from './Interfaces';
export default class Model extends ActiveRecord {
    static hydrate<T>(attributes?: any, options?: object): any;
    changed: object;
    fields: string[];
    relationships: object;
    rules: string[];
    validationError: any;
    protected dataKey: string | undefined;
    private relationshipCache;
    constructor(attributes?: any, options?: any);
    set(hash?: IAttributes): any;
    fetch(options?: IModelRequestOptions | null, queryParams?: IModelRequestQueryParams): Promise<void | Request | Response>;
    hasOne(relationshipName: string, relationshipClass: any): any;
    hasMany(relationshipName: string, relationshipClass: any): any;
    private validate;
}
