import Builder from './Http/Builder';
import Core from './Core';
import EloquentRequest from './Http/Request';
import { IAttributes, ICachedResponses, IModelRequestOptions, IModelRequestQueryParams, IProgressEvent } from './Interfaces';
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
    hasFetched: boolean;
    hasLoaded: boolean;
    headers: any;
    id: string;
    limit: number;
    loading: boolean;
    meta: any;
    modifiedEndpointPosition: string;
    page: number;
    parent: any;
    request?: EloquentRequest;
    requestTime: number;
    protected builder: Builder;
    protected cidPrefix: string;
    protected dataKey: string | undefined;
    protected lastRequest: any;
    protected loadingHookPre: any;
    protected loadingHookPost: any;
    protected runLastAttempts: number;
    protected runLastAttemptsMax: number;
    protected referenceForModifiedEndpoint: ActiveRecord | null | undefined;
    constructor(options?: any);
    attr(key: string): string | number | null;
    set(hash?: IAttributes, trigger?: boolean): any;
    unset(key: string): any;
    options(options?: any): any;
    toJSON(): object;
    create(attributes: any): Promise<EloquentRequest>;
    delete(attributes?: any): Promise<EloquentRequest>;
    post(attributes?: any): Promise<EloquentRequest>;
    put(attributes: any): Promise<EloquentRequest>;
    save(attributes?: any): Promise<EloquentRequest>;
    add(x: any): any;
    remove(x: any): void;
    reset(): void;
    addLoadingHooks(view: any, preHook?: any, postHook?: any): this;
    removeLoadingHooks(): this;
    find(id: string | number, queryParams?: IModelRequestQueryParams): Promise<any>;
    file(name: string, file: HTMLInputElement | FileList | File): Promise<void | EloquentRequest | Response>;
    fetch(options?: IModelRequestOptions | null, queryParams?: IModelRequestQueryParams): Promise<void | EloquentRequest | Response>;
    upload(name: string, file: HTMLInputElement | FileList | File): Promise<void | EloquentRequest | Response>;
    runLast(): any;
    getUrlByMethod(method: string): string;
    cancelModifiedEndpoint(): any;
    isUsingModifiedEndpoint(): boolean;
    getReferencedEndpoint(): any;
    getModifiedEndpoint(): string;
    useModifiedEndpoint(activeRecord: ActiveRecord, position?: string): any;
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
    setAfterResponse(request: EloquentRequest, options?: any): void;
    protected _fetch(options?: IModelRequestOptions | null, queryParams?: IModelRequestQueryParams, method?: any, body?: any, headers?: any): any;
    protected static cachedResponses: ICachedResponses;
    protected cache(key: string, value: any, isComplete?: boolean, ttl?: number): void;
    protected isCached(key: string): boolean;
    protected isCachePending(key: string): boolean;
    protected getCache(key: string): any;
    protected addCacheSubscriber(key: string, resolve: any, reject: any, collection: any): void;
    protected clearCacheSubscribers(key: string): void;
    protected FetchComplete(request: EloquentRequest, options?: any): void;
    protected FetchProgress(progress: IProgressEvent, options?: any): void;
    protected FetchParseAfter(request: EloquentRequest, options?: any): void;
}
