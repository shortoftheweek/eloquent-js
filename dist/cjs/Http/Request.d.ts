import Core from '../Core';
import { IAttributes } from '../Interfaces';
export default class Request extends Core {
    data: IAttributes;
    dataKey: string;
    headers: any;
    loading: boolean;
    method: string;
    mode: string;
    request?: Promise<Request | Response>;
    response?: Response;
    url: string;
    constructor(url: string, params?: any);
    fetch(method?: string | null, body?: any, headers?: any): Promise<Request>;
    xhrFetch(url: string, params: any): any;
    setHeader(header: string, value: string): any;
    setHeaders(headers: any): any;
    private beforeParse;
    private parse;
    private afterParse;
    private afterFetch;
    private afterAll;
}
