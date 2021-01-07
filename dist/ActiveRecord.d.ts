import Builder from './Http/Builder';
import Core from './Core';
import Request from './Http/Request';
import { IAttributes, IModelRequestOptions, IModelRequestQueryParams } from './Interfaces';
export default class ActiveRecord extends Core {
    get b(): Builder;
    protected get isModel(): boolean;
    attributes: any;
    baseUrl: string;
    body: any;
    cacheable: boolean;
    cid: string;
    endpoint: string;
    delete_endpoint: string | undefined;
    post_endpoint: string | undefined;
    put_endpoint: string | undefined;
    headers: any;
    id: string;
    limit: number;
    loading: boolean;
    meta: any;
    modifiedEndpoint: string | null;
    page: number;
    parent: any;
    request?: Request;
    requestTime: number;
    protected builder: Builder;
    protected cidPrefix: string;
    protected dataKey: string | undefined;
    protected lastRequest: any;
    protected runLastAttempts: number;
    protected runLastAttemptsMax: number;
    private referenceForModifiedEndpoint;
    constructor(options?: any);
    attr(key: string): string | number | null;
    set(hash?: IAttributes, trigger?: boolean): any;
    unset(key: string): any;
    options(options?: any): any;
    toJSON(): object;
    create(attributes: any): any;
    delete(attributes?: any): any;
    post(attributes?: any): any;
    put(attributes: any): any;
    save(attributes?: any): any;
    add(x: any): void;
    remove(x: any): void;
    reset(): void;
    find(id: string | number, queryParams?: IModelRequestQueryParams): Promise<any>;
    file(name: string, file: HTMLInputElement | FileList | File): Promise<void | Request | Response>;
    fetch(options?: IModelRequestOptions | null, queryParams?: IModelRequestQueryParams): Promise<void | Request | Response>;
    upload(name: string, file: HTMLInputElement | FileList | File): Promise<void | Request | Response>;
    runLast(): any;
    getUrlByMethod(method: string): string;
    cancelModifiedEndpoint(): any;
    useModifiedEndpoint(activeRecord: ActiveRecord): any;
    setBody(value: any): any;
    setEndpoint(endpoint: string): any;
    setHeader(header: string, value: string | null): any;
    setHeaders(headers: any): any;
    setId(id: any): any;
    unsetId(): any;
    unsetHeader(header: string): any;
    setQueryParam(key: string, value: string): any;
    setQueryParams(params: any): any;
    unsetQueryParam(param: string): any;
    setToken(token: string): any;
    protected _fetch(options?: IModelRequestOptions | null, queryParams?: IModelRequestQueryParams, method?: any, body?: any, headers?: any): any;
    protected FetchComplete(request: Request, e: any, options?: any): void;
    protected FetchProgress(request: Request, e: any, options?: any): void;
    protected FetchParseAfter(request: Request, e: any, options?: any): void;
}
