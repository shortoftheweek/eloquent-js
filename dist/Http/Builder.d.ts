import ActiveRecord from '../ActiveRecord';
export default class Builder {
    get baseUrl(): string;
    get endpoint(): string;
    id: string;
    includes: string[];
    queryParams: any;
    private activeRecord;
    constructor(activeRecord: ActiveRecord);
    get queryParamsAsString(): string;
    get url(): string;
    identifier(id: string | number): Builder;
    include(value: string): Builder;
    queryParam(key: string, value: string | number): Builder;
    qp(key: string, value: string | number): Builder;
}
