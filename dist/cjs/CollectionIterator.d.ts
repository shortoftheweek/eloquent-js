import Collection from './Collection';
export default class CollectionIterator {
    static ITERATOR_VALUES: number;
    static ITERATOR_KEYS: number;
    static ITERATOR_KEYSVALUES: number;
    index: number;
    private collection;
    private kind;
    constructor(collection: Collection, kind?: number);
    next(): {
        value: any;
        done: boolean;
    };
}
