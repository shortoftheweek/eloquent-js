import Collection from './Collection';
/**
 * Collection Iterator
 */
export declare class CollectionIterator {
    static ITERATOR_VALUES: number;
    static ITERATOR_KEYS: number;
    static ITERATOR_KEYSVALUES: number;
    /**
     * Current index of iterator
     *
     * @type number
     */
    index: number;
    /**
     * Reference to collection
     *
     * @type Collection
     */
    private collection;
    /**
     * Type of iterator
     * 0 = values
     * 1 = keys
     * 2 = keys + values
     *
     * @type number
     */
    private kind;
    /**
     * Constructor
     */
    constructor(collection: Collection, kind?: number);
    /**
     * Next item
     */
    next(): {
        value: any;
        done: boolean;
    };
}