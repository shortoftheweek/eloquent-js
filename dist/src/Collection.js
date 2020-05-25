import ActiveRecord from './ActiveRecord';
import Model from './Model';
/**
 * [Collection description]
 *
 * @type {[type]}
 */
export default class Collection extends ActiveRecord {
    constructor() {
        super(...arguments);
        /**
         * Model object instantiated by this collection
         *
         * @type {any}
         */
        // @ts-ignore Because webpack attempts to autoload this
        this.model = Model;
        /**
         * The key that collection data exists on, e.g.
         *
         * {
         *     data: [ .. ]
         * }
         *
         * @type string
         */
        this.dataKey = 'data';
    }
    /**
     * @todo
     *
     * @return {number} [description]
     */
    get length() {
        return 0;
    }
    toJSON(options = {}) {
        // Not implemented
    }
    sync() {
        // Not implemented
        // call parent
    }
    add(models, options = {}) {
        // Not implemented
    }
    remove(models, options = {}) {
        // Not implemented
    }
    set(models, options = {}) {
        // Not implemented
    }
    reset(models, options = {}) {
        // Not implemented
    }
    push(model, options = {}) {
        // Not implemented
    }
    pop(model, options = {}) {
        // Not implemented
    }
    unshift(model, options = {}) {
        // Not implemented
    }
    shift(options = {}) {
        // Not implemented
    }
    slice() {
        // Not implemented
    }
    // public get(obj: any) : any
    // {
    //     // Not implemented
    // }
    has(obj) {
        // Not implemented
    }
    at(index = 0) {
        // Not implemented
    }
    where(attributes = {}, first = false) {
        // Not implemented
    }
    findWhere(attributes = {}) {
        // Not implemented
    }
    sort(options = {}) {
        // Not implemented
    }
    pluck(attributes = {}) {
        // Not implemented
    }
    // public fetch(options: object = {}) : any
    // {
    //     // Not implemented
    // }
    create(model = {}, options = {}) {
        // Not implemented
    }
    parse(response, options = {}) {
        // Not implemented
    }
    clone(attributes = {}) {
        // Not implemented
    }
    modelId(attributes = {}, idAttribute = 'id') {
        return attributes[idAttribute || this.model.idAttribute];
    }
    values() {
        // Not implemented
    }
    keys(attributes = {}) {
        // Not implemented
    }
    entries(attributes = {}) {
        // Not implemented
    }
    _reset() {
        // Not implemented
    }
    _prepareModel(attributes = {}) {
        // Not implemented
    }
    _removeModels(attributes = {}) {
        // Not implemented
    }
    _isModel(attributes = {}) {
        // Not implemented
    }
    _addReference(attributes = {}) {
        // Not implemented
    }
    _removeReference(attributes = {}) {
        // Not implemented
    }
    _onModelEvent(attributes = {}) {
        // Not implemented
    }
}
//# sourceMappingURL=Collection.js.map