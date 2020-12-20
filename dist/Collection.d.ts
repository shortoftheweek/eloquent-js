import ActiveRecord from './ActiveRecord';
import CollectionIterator from './CollectionIterator';
import Model from './Model';
import Request from './Http/Request';
import { ICollectionMeta, IPagination, ISortOptions } from './Interfaces';
export default class Collection extends ActiveRecord implements Iterable<Model> {
    static hydrate<T>(models?: Model[], options?: object): any;
    get length(): number;
    get modelId(): string;
    get pagination(): IPagination;
    atRelationship: string[];
    meta: ICollectionMeta;
    model: Model;
    models: Model[];
    protected dataKey: string | undefined;
    protected index: number;
    protected sortKey: string;
    constructor(options?: any);
    toJSON(): object;
    fetchNext(append?: boolean): Promise<void | Request | Response>;
    sync(): any;
    add(model: Model[] | Model | object, options?: any): Collection;
    remove(model: Model[] | Model | object, options?: any): Collection;
    set(model: Model[] | Model | object, options?: any): Collection;
    reset(): Collection;
    clear(): Collection;
    delete(attributes?: any): any;
    push(model: Model[] | Model | object, options?: object): Collection;
    pop(options?: object): Collection;
    unshift(model: Model[] | Model | object, options?: object): Collection;
    shift(options?: object): Collection;
    slice(...params: any): Model[];
    get(query: Model | string | number): Model | undefined;
    has(obj: Model | string | number): boolean;
    at(index?: number): Model;
    first(): Model;
    last(): Model;
    next(): Model;
    previous(): Model;
    current(): Model;
    where(attributes?: any, first?: boolean): any;
    findWhere(attributes?: object): Model;
    findByCid(cid: string): Model | undefined;
    each(predicate: any): any;
    filter(predicate: any): any;
    find(predicate: any): any;
    sort(options?: ISortOptions | null): Collection;
    pluck(attribute: string): any;
    clone(attributes?: object): any;
    values(): CollectionIterator;
    keys(attributes?: object): CollectionIterator;
    entries(attributes?: object): CollectionIterator;
    private _isModel;
    [Symbol.iterator](): Iterator<any>;
}
