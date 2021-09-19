
export interface IAttributes {
    [key: string]: any;
}

export interface IAxiosConfig {
	adapter?: any;
	data?: any;
	headers?: any;
	maxBodyLength?: number;
	maxContentLength?: number;
	method?: string;
	redirect?: string;
	timeout?: number;
	transformRequest?: any;
	transformResponse?: any;
	transitional?: any;
	url?: string;
	validateStatus?: any;
	withCredentials?: boolean;
	xsrfCookieName?: string;
	xsrfHeaderName?: string;
}

export interface IAxiosError {
	config: IAxiosConfig;
	isAxiosError: boolean;
	request: XMLHttpRequest;
	response: IAxiosResponse;
}

export interface IAxiosSuccess extends IAxiosResponse {

}

export interface IAxiosResponse {
	config: IAxiosConfig;
	data?: any;
	headers: any;
	request: XMLHttpRequest;
	status: number;
	statusText: string;
}

export interface ICachedResponse {
    complete?: boolean;
    time?: number;
    value?: any;
    ttl?: number;
    subscribers?: any[];
}

export interface ICachedResponses {
    [key: string]: ICachedResponse;
}

export interface ICollectionChange {
    from: string;
}

export interface ICollectionMeta {
    pagination: IPagination;
}

export interface IDispatcher {
    // events: any;
    trigger: (eventName: string, data?: any) => any;
    dispatch: (eventName: string, data?: any) => any;
    on: (eventName: string, callback: (data?: any) => void) => any;
    off: (eventName: string, callback?: any) => any;
}

export interface IModelRequestOptions {
    id?: number | string;
    includes?: string[];
}

export interface IModelRequestQueryParams {
    [key: string]: any;
}

export interface IPagination {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links?: any;
}

export interface IProgressEvent {
    loaded: number;
    ratio: number;
    total: number;
}

export interface IDispatcherEvent {
    data: any;
    event: any;
    target: any;
}

export interface ISortOptions {
    key: string;
    reverse?: boolean;
}
