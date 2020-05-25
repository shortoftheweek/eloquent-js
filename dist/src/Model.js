import ActiveRecord from './ActiveRecord';
/**
 * [Eloquent description]
 *
 * @type {[type]}
 */
export default class Model extends ActiveRecord {
    constructor(attributes = {}, options = {}) {
        super(options);
        /**
         * Hash of attributes whos current + previous value differ
         *
         * @type {object}
         */
        this.changed = {};
        /**
         * List of fields available
         *
         * @type string[]
         */
        this.fields = [];
        /**
         * List of fields available
         *
         * @type string[]
         */
        this.rules = [];
        /**
         * List of relationships available
         *
         * @type object
         */
        this.relationships = {};
        /**
         * Error during validation
         *
         * @type {any}
         */
        this.validationError = null;
        /**
         * Default JSON ID attribute
         *
         * @type {string}
         */
        this.idAttribute = 'id';
        /**
         * The key that collection data exists on, e.g.
         *
         * {
         *     data: [ .. ]
         * }
         *
         * @type string
         */
        this.dataKey = undefined;
        // Set defaults
        this.changed = {};
        this.cid = this.cidPrefix + Math.random().toString(36).substr(2, 5);
        // Set attributes
        this.set(attributes);
    }
    save() {
    }
    delete() {
    }
    /**
     * Validates data
     *
     * @todo Not implemented
     *
     * @return boolean
     */
    validate(attributes, options = {}) {
        if (!this.validate || !options.validate) {
            return true;
        }
        // const attributes:
        return false;
    }
}
//# sourceMappingURL=Model.js.map