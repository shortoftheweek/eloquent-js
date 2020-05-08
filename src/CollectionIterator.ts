
import Collection from './Collection';
import Model from './Model';

/**
 * Collection Iterator
 */
export class CollectionIterator
{
    public static ITERATOR_VALUES = 0;
    public static ITERATOR_KEYS = 1;
    public static ITERATOR_KEYSVALUES = 2;

    /**
     * Current index of iterator
     *
     * @type number
     */
    public index: number = 0;

    /**
     * Reference to collection
     *
     * @type Collection
     */
    private collection: Collection | undefined;

    /**
     * Type of iterator
     * 0 = values
     * 1 = keys
     * 2 = keys + values
     *
     * @type number
     */
    private kind: number = CollectionIterator.ITERATOR_VALUES;

    /**
     * Constructor
     */
    constructor(collection: Collection, kind: number = 0)
    {
        this.collection = collection;
        this.kind = kind;
        this.index = 0;
    }

    /**
     * Next item
     */
    public next()
    {
        if (this.collection) {

            // Only continue iterating if the iterated collection is long enough.
            if (this.index < this.collection.length) {
                const model: Model = this.collection.at(this.index);
                this.index++;

                // Construct a value depending on what kind of values should be iterated.
                let value;

                // Return model as value
                if (this.kind === CollectionIterator.ITERATOR_VALUES) {
                    value = model;
                }
                else {
                    var id = this.collection.modelId(model.attributes);

                    if (this.kind === CollectionIterator.ITERATOR_KEYS) {
                        value = id;
                    }
                    else {
                        value = [id, model];
                    }
                }

                return {
                    value: value,
                    done: false,
                }
            }

            // Once exhausted, remove the reference to the collection so future
            // calls to the next method always return done.
            this.collection = void 0;
        }

        return {
            value: void 0,
            done: true,
        }
    }

}
