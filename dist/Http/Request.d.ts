import { AxiosResponse } from 'axios';
import Core from '../Core';
import { IAttributes, IAxiosResponse, IAxiosSuccess, IRequest } from '../Interfaces';
export default class Request extends Core implements IRequest {
    dataKey: string;
    headers: any;
    loading: boolean;
    method: string;
    mode: string;
    name: string;
    request?: Promise<Request | Response | AxiosResponse<any>>;
    response?: IAxiosResponse | IAxiosSuccess;
    responseData: IAttributes;
    url: string;
    constructor(url?: string, options?: any);
    fetch(method?: string | null, body?: any, headers?: any): Promise<Request | AxiosResponse<any>>;
    xhrFetch(url: string, params: any): any;
    setHeader(header: string, value: string): any;
    setHeaders(headers: any): any;
    private beforeParse;
    private parse;
    private afterParse;
    private afterFetch;
    private afterAll;
    private log;
}
