import ActiveRecord from '../ActiveRecord';
export default class Builder {
    getBaseUrl(): string;
    getEndpoint(): string;
    id: string;
    includes: string[];
    queryParams: any;
    private activeRecord;
    constructor(activeRecord: ActiveRecord);
    getQueryParamsAsString(): string;
    getUrl(): string;
    identifier(id: string | number): Builder;
    include(value: string): Builder;
    queryParam(key: string, value: string | number): Builder;
    qp(key: string, value: string | number): Builder;
}
