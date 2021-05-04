"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActiveRecord2 = _interopRequireDefault(require("./ActiveRecord.js"));

var _CollectionIterator = _interopRequireDefault(require("./CollectionIterator.js"));

var _Model = _interopRequireDefault(require("./Model.js"));

var _Symbol$iterator;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_Symbol$iterator = Symbol.iterator;

/**
 * [Collection description]
 *
 * 'meta': {
 *     'pagination': {
 *         'total': 1938,
 *         'count': 15,
 *         'per_page': 15,
 *         'current_page': 1,
 *         'total_pages': 130,
 *         'links': {
 *             'next': 'http://api.sotw.com/v1/film?page=2'
 *         }
 *     }
 * }
 *
 */
var Collection = /*#__PURE__*/function (_ActiveRecord) {
  _inherits(Collection, _ActiveRecord);

  var _super = _createSuper(Collection);

  /**
   * Constructor
   *
   * We specifically don't set models here because the Model doesn't exist
   * until constructor is done. We must use hydrate for that. Don't add data.
   *
   * If we do it early, we won't get FilmModels, we'll get Models.
   *
   * @param {object = {}} options
   */
  function Collection() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Collection);

    _this = _super.call(this, options); // Default builder

    _defineProperty(_assertThisInitialized(_this), "atRelationship", []);

    _defineProperty(_assertThisInitialized(_this), "index", 0);

    _defineProperty(_assertThisInitialized(_this), "meta", {
      pagination: {
        total: 0,
        count: 15,
        per_page: 15,
        current_page: 1,
        total_pages: 1,
        links: {}
      }
    });

    _defineProperty(_assertThisInitialized(_this), "model", _Model["default"]);

    _defineProperty(_assertThisInitialized(_this), "models", []);

    _defineProperty(_assertThisInitialized(_this), "dataKey", 'data');

    _defineProperty(_assertThisInitialized(_this), "sortKey", 'id');

    _this.builder.qp('limit', _this.limit).qp('page', _this.page); // Set default content type header


    _this.setHeader('Content-Type', 'application/json; charset=utf8'); // Set defaults


    _this.cid = _this.cidPrefix + Math.random().toString(36).substr(2, 5); // Custom options

    if (options.atRelationship) {
      _this.atRelationship = options.atRelationship;
    }

    return _this;
  }
  /**
   * Convert collection to JSON
   *
   * @return {any}
   */


  _createClass(Collection, [{
    key: "length",
    get:
    /**
     * Return count of models
     *
     * @todo Make sure this isn't caching
     *
     * @return number
     */
    function get() {
      return this.models.length;
    }
    /**
     * @todo Replace this based on Model
     * @return {string}
     */

  }, {
    key: "modelId",
    get: function get() {
      return 'id';
    }
    /**
     * Pagination
     *
     * @return IPagination
     */

  }, {
    key: "pagination",
    get: function get() {
      return this.meta.pagination;
    }
    /**
     * Descending list, for instance:
     *
     *     ['receiver', 'person']
     *
     * Translates to:
     *
     *     at(0).receiver.person
     *
     * @type {string[]}
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return JSON.parse(JSON.stringify(this.models));
    }
    /**
     * Fetch next page with last set of options
     *
     * @return {any}
     */

  }, {
    key: "fetchNext",
    value: function () {
      var _fetchNext = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var append,
            options,
            qp,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                append = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;
                options = Object.assign({}, this.lastRequest.options);
                qp = Object.assign({}, this.builder.queryParams, this.lastRequest.queryParams); // Increase page number

                qp.page = parseFloat(qp.page) + 1; // Merge

                options.merge = append; // Fetch

                _context.next = 7;
                return this._fetch(options, qp, this.lastRequest.method, this.lastRequest.body, this.lastRequest.headers);

              case 7:
                return _context.abrupt("return", _context.sent);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchNext() {
        return _fetchNext.apply(this, arguments);
      }

      return fetchNext;
    }()
    /**
     * Sync
     *
     * @todo
     *
     * @return {any}
     */

  }, {
    key: "sync",
    value: function sync() {// Not implemented
      // call parent
    }
    /**
     * Add or prepend Model(s) to our list
     *
     * @param  {Model[] | Model | object} model
     * @param  {any = {}} options
     * @return Collection
     */

  }, {
    key: "add",
    value: function add(model) {
      var _this2 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (model == undefined) {
        return this;
      }

      var models = Array.isArray(model) ? model : [model]; // Iterate through models

      models.forEach(function (model) {
        // Data supplied is an object that must be instantiated
        if (!(model instanceof _Model["default"])) {
          // @ts-ignore
          model = new _this2.model(model); // model = this.createModel(model);
        }

        if (options.prepend) {
          _this2.models.unshift(model);
        } else {
          _this2.models.push(model);
        }
      }); // Event for add

      this.dispatch('add');
      return this;
    }
    /**
     * Remove a model, a set of models, or an object
     *
     * @param  {Model[] | Model | object} model
     * @param  {object = {}} options
     * @return {Collection}
     */

  }, {
    key: "remove",
    value: function remove(model) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var i = 0;
      var ii = 0;
      var items = Array.isArray(model) ? model : [model]; // Take the first model in our list and iterate through our local
      // models. If we are successful, call recursive

      for (ii = 0; ii < items.length; ii++) {
        i = 0;

        while (i < this.models.length) {
          if (this.models[i] == items[ii]) {
            this.models.splice(i, 1);
          } else {
            ++i;
          }
        }
      } // Event for add


      this.dispatch('remove');
      return this;
    }
    /**
     * Reset and add new models
     *
     * @todo Review this
     *
     * @param  {Model[] | Model | object} model
     * @param  {any = {}} options
     * @return {Collection}
     */

  }, {
    key: "set",
    value: function set(model) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!options || options && options.merge != true) {
        this.reset();
      } // Check for `meta` on set, this sometimes happens
      // if we assign an entire bootstrapped JSON object
      // to the collection


      if (model && model.hasOwnProperty('meta')) {
        // @ts-ignore
        this.meta = model.meta;
      } // Check for `meta` on set, this sometimes happens
      // if we assign an entire bootstrapped JSON object
      // to the collection


      if (model && model.hasOwnProperty('data')) {
        // @ts-ignore
        this.add(model.data);
      } else {
        // @ts-ignore
        this.add(model);
      } // Event for add


      this.dispatch('set');
      return this;
    }
    /**
     * Reset
     *
     * @todo Might want to do more with this
     * @return {Collection}
     */

  }, {
    key: "reset",
    value: function reset() {
      this.models = []; // Event for add

      this.dispatch('reset');
      return this;
    }
    /**
     * Clear
     *
     * Alias for Reset
     */

  }, {
    key: "clear",
    value: function clear() {
      return this.reset();
    }
    /**
     * Count
     *
     * @return Number
     */

  }, {
    key: "count",
    value: function count() {
      return this.length;
    }
    /**
     * Delete Model
     *
     * @todo There's a ton to do here too
     */

  }, {
    key: "delete",
    value: function _delete() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      // Query params
      var url = this.builder.identifier(this.id || (attributes ? attributes.id : '')).url; // Check for identifier

      if (this.builder.id) {
        var model = this.find(attributes);
        this.remove(model);
      } // Attributes


      var body = null;
      var headers = this.headers;
      var method = 'DELETE';
      return this._fetch(null, {}, method, body, headers);
    }
    /**
     * Append Model(s) to end of list
     *
     * @param  {Model[] | Model | object} model
     * @param  {object = {}} options
     * @return {Collection}
     */

  }, {
    key: "push",
    value: function push(model) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.add(model, options);
      return this;
    }
    /**
     * Remove model from end of list
     *
     * @param  {object = {}} options
     * @return Collection
     */

  }, {
    key: "pop",
    value: function pop() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var model = this.at(this.length - 1);
      return this.remove(model, options);
    }
    /**
     * Add Model(s) to beginning of list
     *
     * @param  {Model[] | Model | object} model
     * @param  {object = {}} options
     * @return {any}
     */

  }, {
    key: "unshift",
    value: function unshift(model) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.add(model, Object.assign({
        prepend: true
      }, options));
    }
    /**
     * Remove first object
     *
     * @param  {object = {}} options
     * @return {any}
     */

  }, {
    key: "shift",
    value: function shift() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var model = this.at(0);
      return this.remove(model, options);
    }
    /**
     * Cut up collection models
     *
     * @return Model[]
     */

  }, {
    key: "slice",
    value: function slice() {
      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      return Array.prototype.slice.apply(this.models, params);
    }
    /**
     * Get model by ID
     *
     * @param  string | number  id
     * @return Model | undefined
     */

  }, {
    key: "get",
    value: function get(query) {
      if (query == null) {
        return void 0;
      }

      return this.where(_defineProperty({}, this.modelId, query instanceof _Model["default"] ? query.cid : query), true);
    }
    /**
     * Checks if we have an object or Model
     *
     * @param  Model | object  obj
     * @return boolean
     */

  }, {
    key: "has",
    value: function has(obj) {
      return this.get(obj) != undefined;
    }
    /**
     * Get model at index
     *
     * @param  {number = 0} index
     * @return Model
     */

  }, {
    key: "at",
    value: function at() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (index < 0) {
        index += this.length;
      } // Get model


      var item = this.models[index]; // Transform through

      if (this.atRelationship && this.atRelationship.length) {
        this.atRelationship.forEach(function (key) {
          return item = item[key];
        });
      }

      return item;
    }
    /**
     * Get first item
     *
     * @return {Model}
     */

  }, {
    key: "first",
    value: function first() {
      return this.at(0);
    }
    /**
     * Get last item
     *
     * @return {Model}
     */

  }, {
    key: "last",
    value: function last() {
      return this.at(this.length - 1);
    }
  }, {
    key: "next",
    value: function next() {
      // We have reached the end
      // if (this.index >= this.length) {
      //     return false;
      // }
      // Get model
      var model = this.at(++this.index);
      return model;
    }
  }, {
    key: "previous",
    value: function previous() {
      // We have reached the beginning
      // if (this.index <= 0) {
      //     return false;
      // }
      // Advance
      return this.at(--this.index);
    }
  }, {
    key: "current",
    value: function current() {
      // Advance
      return this.at(this.index);
    }
    /**
     * Comparing hard object attributes to model attr
     *
     * @param  {any = {}} attributes
     * @param  {boolean = false} first
     * @return {any}
     */

  }, {
    key: "where",
    value: function where()
    /* Self */
    {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var first = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var constructor = this.constructor;
      var collection = new constructor(); // @todo, this code sucks but I'm not spending all day here

      this.models.map(function (model) {
        var intersection = Object.keys(model.attributes).filter(function (k) {
          return k in attributes && model.attr(k) == attributes[k];
        });

        if (intersection.length) {
          collection.add(model);
        }
      });
      return first ? collection.first() : collection;
    }
    /**
     * First where
     * @param  {object = {}} attributes
     * @return Model
     */

  }, {
    key: "findWhere",
    value: function findWhere() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.where(attributes, true);
    }
    /**
     * Search by CID
     * @param  {string} cid
     * @return {Model}
     */

  }, {
    key: "findByCid",
    value: function findByCid(cid) {
      return this.findWhere({
        cid: cid
      });
    }
    /**
     * Each
     * @param  {string} cid
     * @return {Model}
     */

  }, {
    key: "each",
    value: function each(predicate) {
      this.models.forEach(predicate);
      return this;
    }
    /**
     * Alias for Where
     *
     * @param  {string} cid
     * @return {Model}
     */

  }, {
    key: "filter",
    value: function filter(predicate) {
      return this.where(predicate);
    }
    /**
     * Sorting models by key or in reverse
     *
     * We have a basic `sortKey` defined on the collection, but
     * can also pass in an object with `key` and `reverse` on it
     *
     * @param  {ISortOptions|null = null} options
     * @return {Collection}
     */

  }, {
    key: "sort",
    value: function sort() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var key = this.sortKey; // Sort options

      if (options !== null) {
        key = options.key;
      } // Sort


      this.models = this.models.sort(function (a, b) {
        return options && options.reverse ? (a.attr(key) - b.attr(key)) * -1 : (a.attr(key) - b.attr(key)) * 1;
      });
      return this;
    }
    /**
     * Pull out an attribute from our models
     *
     * Example:
     *     collection.pluck('name');
     *
     *     ['Ashley', 'Briana', 'Chloe', ...]
     *
     * @param  {string} attribute
     * @return {any}
     */

  }, {
    key: "pluck",
    value: function pluck(attribute) {
      return this.models.map(function (model) {
        return model.attr(attribute);
      });
    }
    /**
     * Clone current object
     *
     * @param {object = {}} attributes
     * @return Collection
     */

  }, {
    key: "clone",
    value: function clone() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // @ts-ignore
      var instance = new this.constructor();
      instance.add(this.toJSON());
      return instance;
    }
    /**
     * Return an interator for values based on this collection
     *
     * @return CollectionIterator
     */

  }, {
    key: "values",
    value: function values() {
      return new _CollectionIterator["default"](this, _CollectionIterator["default"].ITERATOR_VALUES);
    }
    /**
     * Return an interator for keys based on this collection
     *
     * @return CollectionIterator
     */

  }, {
    key: "keys",
    value: function keys() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new _CollectionIterator["default"](this, _CollectionIterator["default"].ITERATOR_KEYS);
    }
    /**
     * Return an interator for entries (key + value) based on this collection
     *
     * @return CollectionIterator
     */

  }, {
    key: "entries",
    value: function entries() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new _CollectionIterator["default"](this, _CollectionIterator["default"].ITERATOR_KEYSVALUES);
    }
    /**
     * Determine if an object is infact a model
     *
     * @param  {any} model
     * @return {boolean}
     */

  }, {
    key: "_isModel",
    value: function _isModel(model) {
      return model instanceof _Model["default"];
    }
    /**
     * Iterator
     */

  }, {
    key: _Symbol$iterator,
    value: function value() {
      return new _CollectionIterator["default"](this, _CollectionIterator["default"].ITERATOR_VALUES);
    }
  }], [{
    key: "hydrate",
    value:
    /**
     * Hydrate a collection full of models
     *
     * @type {Model[]}
     */
    function hydrate() {
      var models = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // Instantiate collection
      var collection = new this(options); // Add models to collection

      collection.add(models); // Add options to collection

      collection.options(options);
      return collection;
    }
  }]);

  return Collection;
}(_ActiveRecord2["default"]);

exports["default"] = Collection;