"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActiveRecord2 = _interopRequireDefault(require("./ActiveRecord.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * [Eloquent description]
 *
 * @type {[type]}
 */
var Model = /*#__PURE__*/function (_ActiveRecord) {
  _inherits(Model, _ActiveRecord);

  var _super = _createSuper(Model);

  /**
   * Constructor
   */
  function Model() {
    var _this;

    var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Model);

    _this = _super.call(this, options); // Set defaults

    _defineProperty(_assertThisInitialized(_this), "changed", {});

    _defineProperty(_assertThisInitialized(_this), "fields", []);

    _defineProperty(_assertThisInitialized(_this), "relationships", {});

    _defineProperty(_assertThisInitialized(_this), "rules", []);

    _defineProperty(_assertThisInitialized(_this), "validationError", null);

    _defineProperty(_assertThisInitialized(_this), "dataKey", undefined);

    _defineProperty(_assertThisInitialized(_this), "relationshipCache", {});

    _this.changed = {};
    _this.cid = _this.cidPrefix + Math.random().toString(36).substr(2, 5); // Set default content type header

    _this.setHeader('Content-Type', 'application/json; charset=utf8'); // Set attributes


    _this.set(attributes);

    return _this;
  }
  /**
   * Set attributes by hashmap
   *
   * @note Unsure if we should delete existing relationships
   * or `set` on them. I think we have failures with the `set`
   *
   * @param object = {} hash
   *
   * @return ActiveRecord
   */


  _createClass(Model, [{
    key: "set",
    value: function set() {
      var hash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // mk: 29, we disabled this because it breaks references
      // but we had previously enabled it for some reason.
      // What would that reason be?
      // This forces a reset of relationship caches
      // for (let key in hash) {
      //     // @ts-ignore
      //     if (this.relationshipCache[key]) {
      //         // @ts-ignore
      //         delete this.relationshipCache[key];
      //     }
      // }
      // Don't trigger event
      _get(_getPrototypeOf(Model.prototype), "set", this).call(this, hash, false); // Check attributes if everything looks ok


      if (this.attributes.data && this.attributes.data.length) {
        console.warn('This model is incorrectly getting collection data.', this);
      } // Update any relationship caches that exist
      // Don't delete them, as to save references


      var key;

      for (key in hash) {
        if (this.relationshipCache[key]) {
          this.relationshipCache[key].set(hash[key]);
        }
      } // Trigger event


      this.dispatch('set');
      return this;
    } // /**
    //  * Save model
    //  *
    //  * @todo There so much to do to fix this
    //  *
    //  * @param  {any = {}} options
    //  * @param  {any = {}} queryParams
    //  * @return {any}
    //  */
    // public save(attributes: any): any
    // {
    //     // Query params
    //     const url: string = this.builder
    //         .identifier(this.id)
    //         .url;
    //     // Attributes
    //     const body: any = attributes || this.attributes;
    //     const headers: any = this.headers;
    //     const method: string = this.id ? 'PUT' : 'POST';
    //     return this._fetch(null, {}, method, body, headers);
    // }
    // /**
    //  * Used to get an individual item in a model
    //  *
    //  * Can pass either an ID #XX or a slug
    //  *
    //  * @param  {string | number} id
    //  * @return {Promise}
    //  */
    // public async find(id: string | number, queryParams: IModelRequestQueryParams = {}): Promise<any>
    // {
    //     var self: any = this;
    //     return await super.find(id, queryParams)
    //         .then((request: any) => {
    //             return this;
    //         });
    // }

    /**
     * Public generic fetch method
     *
     * @param  {IModelRequestOptions | null = {}} options
     * @param  {IModelRequestQueryParams = {}} queryParams
     * @return {Promise}
     */

  }, {
    key: "fetch",
    value: function () {
      var _fetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var options,
            queryParams,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                queryParams = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // Query params
                this.builder.identifier(options && options.id ? options.id : this.id); // Check if ID exists

                if (!(options && options.id) && !this.id) {
                  console.warn('Fetching model without ID is likely incorrect behavior.', this, this.id, this.toJSON());
                } // Fetch


                _context.next = 6;
                return _get(_getPrototypeOf(Model.prototype), "fetch", this).call(this, options, queryParams);

              case 6:
                return _context.abrupt("return", _context.sent);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetch() {
        return _fetch.apply(this, arguments);
      }

      return fetch;
    }() // /**
    //  * Delete Model
    //  *
    //  * @todo There's a ton to do here too
    //  */
    // public delete(): any
    // {
    //     // Query params
    //     const url: string = this.builder
    //         .identifier(this.id)
    //         .url;
    //     // Set fetch
    //     return this._fetch(null, {}, 'DELETE');
    // }
    // Relationships
    // ------------------------------------------------------------------------

    /**
     * Return singular instance of related contnet
     *
     * @param  {string} relationshipName
     * @param  {any} relationshipClass
     * @return {any}
     */

  }, {
    key: "hasOne",
    value: function hasOne(relationshipName, relationshipClass) {
      if (this.relationshipCache[relationshipName]) {
        return this.relationshipCache[relationshipName];
      }

      var content = this.attr(relationshipName) || {};
      var model = new relationshipClass(content); // Reference relationship parent

      model.parent = this;
      model.useModifiedEndpoint(this);
      return this.relationshipCache[relationshipName] = model;
    }
    /**
     * Return multiple instances of related content
     *
     * @param  {string} relationshipName
     * @param  {any} relationshipClass
     * @return {any}
     */

  }, {
    key: "hasMany",
    value: function hasMany(relationshipName, relationshipClass) {
      if (this.relationshipCache[relationshipName]) {
        return this.relationshipCache[relationshipName];
      }

      var content = this.attr(relationshipName) || {
        data: []
      };
      var collection = relationshipClass.hydrate(content.data || content); // Reference relationship parent

      collection.parent = this;
      collection.useModifiedEndpoint(this);
      return this.relationshipCache[relationshipName] = collection;
    }
    /**
     * Validates data
     *
     * @todo Not implemented
     *
     * @return boolean
     */

  }, {
    key: "validate",
    value: function validate(attributes) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!this.validate || !options.validate) {
        return true;
      } // const attributes:


      return false;
    }
  }], [{
    key: "hydrate",
    value:
    /**
     * Hydrate
     *
     * @type {any}
     */
    function hydrate() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // Instantiate collection
      var collection = new this(options); // Add models to collection

      collection.set(attributes); // Add options to collection

      collection.options(options);
      return collection;
    }
    /**
     * Hash of attributes whos current + previous value differ
     *
     * @type {object}
     */

  }]);

  return Model;
}(_ActiveRecord2["default"]);

exports["default"] = Model;