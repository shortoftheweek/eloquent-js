"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Builder = _interopRequireDefault(require("./Http/Builder.js"));

var _Core2 = _interopRequireDefault(require("./Core.js"));

var _Request = _interopRequireDefault(require("./Http/Request.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

/**
 * ActiveRecord
 *
 * @type {[type]}
 */
var ActiveRecord = /*#__PURE__*/function (_Core) {
  _inherits(ActiveRecord, _Core);

  var _super = _createSuper(ActiveRecord);

  /**
   * Constructor
   */
  function ActiveRecord() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ActiveRecord);

    _this = _super.call(this, options); // Set options on class

    _defineProperty(_assertThisInitialized(_this), "attributes", new Object());

    _defineProperty(_assertThisInitialized(_this), "baseUrl", '/v1');

    _defineProperty(_assertThisInitialized(_this), "body", null);

    _defineProperty(_assertThisInitialized(_this), "cacheable", true);

    _defineProperty(_assertThisInitialized(_this), "cid", '');

    _defineProperty(_assertThisInitialized(_this), "endpoint", '');

    _defineProperty(_assertThisInitialized(_this), "hasFetched", false);

    _defineProperty(_assertThisInitialized(_this), "hasLoaded", false);

    _defineProperty(_assertThisInitialized(_this), "headers", {});

    _defineProperty(_assertThisInitialized(_this), "id", '');

    _defineProperty(_assertThisInitialized(_this), "limit", 15);

    _defineProperty(_assertThisInitialized(_this), "loading", false);

    _defineProperty(_assertThisInitialized(_this), "meta", {});

    _defineProperty(_assertThisInitialized(_this), "modifiedEndpoint", null);

    _defineProperty(_assertThisInitialized(_this), "page", 1);

    _defineProperty(_assertThisInitialized(_this), "cidPrefix", 'c');

    _defineProperty(_assertThisInitialized(_this), "dataKey", 'data');

    _defineProperty(_assertThisInitialized(_this), "runLastAttempts", 0);

    _defineProperty(_assertThisInitialized(_this), "runLastAttemptsMax", 2);

    Object.assign(_assertThisInitialized(_this), options); // Setup default last request

    _this.lastRequest = {}; // Setup URL builder

    _this.builder = new _Builder["default"](_assertThisInitialized(_this)); // Options

    _this.options(options); // Mark creation as the rquest


    _this.requestTime = Date.now();
    return _this;
  }
  /**
   * Get attribute
   *
   * @param  string key
   *
   * @return string
   */


  _createClass(ActiveRecord, [{
    key: "b",
    get:
    /**
     * Get builder reference
     *
     * @return Builder
     */
    function get() {
      return this.builder;
    }
    /**
     * Model if we provide a specific identifier
     *
     * @return boolean
     */

  }, {
    key: "isModel",
    get: function get() {
      return this.builder.identifier !== undefined;
    }
    /**
     * Data set by the request
     *
     * @type object
     */
    // public attributes: Map<string, any> = new Map();

  }, {
    key: "attr",
    value: function attr(key) {
      return this.attributes[key];
    }
    /**
     * Set attributes by hashmap
     *
     * @param object = {} hash
     *
     * @return ActiveRecord
     */

  }, {
    key: "set",
    value: function set() {
      var hash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      // @ts-ignore
      var possibleSetters = Object.getOwnPropertyDescriptors(this.__proto__);

      for (var key in hash) {
        this.attributes[key] = hash[key]; // Check for setters

        if (possibleSetters && possibleSetters[key] && possibleSetters[key].set) {
          this[key] = hash[key];
        }
      } // Check for ID


      if (hash && hash['id']) {
        this.id = hash.id;
      } // Trigger


      if (trigger) {
        this.dispatch('set');
      }

      return this;
    }
    /**
     * Unset attribute
     *
     * Attribute will be `undefined` after unsetting
     *
     * @param  string key
     *
     * @return ActiveRecord
     */

  }, {
    key: "unset",
    value: function unset(key) {
      delete this.attributes[key];
      return this;
    }
    /**
     * Apply an object to change options and set meta
     *
     * @param  {any} options
     * @return {ActiveRecord}
     */

  }, {
    key: "options",
    value: function options() {
      var _options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // Override endpoint
      if (_options.endpoint) {
        this.setEndpoint(_options.endpoint);
      } // Check options for headers


      if (_options.headers) {
        this.setHeaders(_options.headers);
      } // Set metadata


      if (_options.meta) {
        // Increase count
        // mk: This is kind of wonky...
        if (_options.merge) {
          if (_options.meta.pagination.count && this.meta.pagination.count) {
            _options.meta.pagination.count += this.meta.pagination.count;
          }
        } // Set


        this.meta = _options.meta;
      } // Check options for params


      if (_options.params || _options.qp || _options.queryParams) {
        this.setQueryParams(_options.queryParams || _options.qp || _options.params);
      }

      return this;
    }
    /**
     * Converts model to JSON object
     *
     * @return object
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = this.attributes; // @todo is this code copasetic?
      // @ts-ignore

      var possibleGetters = Object.getOwnPropertyNames(this.__proto__); // Convert toJSON on subobjects so they stay in sync

      var _iterator = _createForOfIteratorHelper(possibleGetters),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;

          // @ts-ignore
          if (json[key] && this[key] && this[key].toJSON) {
            // @ts-ignore
            json[key] = this[key].toJSON();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return json;
    } //#region Actions

    /**
     * Create Model
     *
     * @todo There's a ton to do here too
     */

  }, {
    key: "create",
    value: function create(attributes) {
      return this.post(attributes);
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
      } // const url: string = this.builder.identifier(
      //     this.id || (attributes ? attributes.id : ''),
      // ).url;
      // Attributes


      var body = null;
      var headers = this.headers;
      var method = 'DELETE';
      return this._fetch(null, {}, method, body, headers);
    }
    /**
     * POST Model
     */

  }, {
    key: "post",
    value: function post() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      // Query params
      var url = this.builder.url; // Attributes

      var body = attributes || this.attributes;
      var headers = this.headers;
      var method = 'POST';
      return this._fetch(null, {}, method, body, headers);
    }
    /**
     * PUT model
     *
     * @param  {any = {}} options
     * @param  {any = {}} queryParams
     * @return {any}
     */

  }, {
    key: "put",
    value: function put(attributes) {
      // Query params
      var url = this.builder.url; // Attributes

      var body = attributes || this.attributes;
      var headers = this.headers;
      var method = 'PUT';
      return this._fetch(null, {}, method, body, headers);
    }
    /**
     * Save model
     *
     * @todo There so much to do to fix this
     *
     * @param  {any = {}} options
     * @param  {any = {}} queryParams
     * @return {any}
     */

  }, {
    key: "save",
    value: function save() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      // Query params
      // const url: string = this.builder.identifier(this.id || (attributes ? attributes.id : "")).url;
      // Attributes
      var body = attributes || this.attributes;
      var headers = this.headers;
      var method = this.id ? 'PUT' : 'POST';
      return this._fetch(null, {}, method, body, headers);
    }
    /**
     * Interface for Collection
     */

  }, {
    key: "add",
    value: function add(x) {}
    /**
     * Interface for Collection
     */

  }, {
    key: "remove",
    value: function remove(x) {}
    /**
     * Empty attributes
     */

  }, {
    key: "reset",
    value: function reset() {
      this.attributes = {};
    }
    /**
     * Used to get an individual item in a model
     *
     * Can pass either an ID #XX or a slug
     *
     * @param  {string | number} id
     * @return {Promise}
     */

  }, {
    key: "find",
    value: function () {
      var _find = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
        var _this2 = this;

        var queryParams,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                queryParams = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                _context.next = 3;
                return this.fetch({
                  id: id
                }, queryParams).then(function (request) {
                  return _this2;
                });

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function find(_x) {
        return _find.apply(this, arguments);
      }

      return find;
    }()
    /**
     * Upload file
     *
     * @param  {string} name
     * @param  {any} file
     * @return {any}
     */

  }, {
    key: "file",
    value: function file(name, _file) {
      var _this3 = this;

      // Query params
      var url = this.builder.identifier(this.id).url; // const files = event.target.files

      var formData = new FormData(); // Get file

      if (_file instanceof HTMLInputElement) {
        _file = _file.files[0];
      } else if (_file instanceof FileList) {
        _file = _file[0];
      } else if (_file instanceof File) {// Good
      } else {
        console.warn('File provided unacceptable type.');
      } // Set header


      this.unsetHeader('Content-Type'); // Add files

      formData.append(name, _file); // Set fetch

      return this._fetch(null, {}, 'POST', formData).then(function (request) {
        _this3.dispatch('file:complete', _this3); // @note This was duplicating our images
        // this.add(request.data);


        return request;
      });
    }
    /**
     * Public generic fetch method
     *
     * NOTE: It is favored to use other methods
     *
     * @param  {IModelRequestOptions | null = {}} options
     * @param  {IModelRequestQueryParams = {}} queryParams
     * @return {Promise}
     */

  }, {
    key: "fetch",
    value: function () {
      var _fetch2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var options,
            queryParams,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                queryParams = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                _context2.next = 4;
                return this._fetch(options, queryParams);

              case 4:
                return _context2.abrupt("return", _context2.sent);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetch() {
        return _fetch2.apply(this, arguments);
      }

      return fetch;
    }()
    /**
     * Alias for `file`
     *
     * @param  {string} name
     * @param  {HTMLInputElement | FileList | File} file
     * @return {Promise}
     */

  }, {
    key: "upload",
    value: function upload(name, file) {
      return this.file(name, file);
    }
    /**
     * Run last query
     * @return {any}
     */

  }, {
    key: "runLast",
    value: function runLast() {
      var _this4 = this;

      // Check if we can do this
      if (++this.runLastAttempts >= this.runLastAttemptsMax) {
        console.warn('Run last attempts expired');
        setTimeout(function () {
          _this4.runLastAttempts = 0;
        }, 1000);
        return;
      }

      return this._fetch(this.lastRequest.options, this.lastRequest.queryParams, this.lastRequest.method, this.lastRequest.body, this.lastRequest.headers);
    } //#endregion Actions
    //#region Get Params

  }, {
    key: "getUrlByMethod",
    value: function getUrlByMethod(method) {
      // Setup URL
      var url = '';
      var originalEndpoint = this.endpoint; // Use a modified endpoint, if one exists

      if (method === 'delete' && this.delete_endpoint) {
        originalEndpoint = this.endpoint;
        this.endpoint = this.delete_endpoint;
      } else if (method === 'put' && this.put_endpoint) {
        originalEndpoint = this.endpoint;
        this.endpoint = this.put_endpoint;
      } else if (method === 'post' && this.post_endpoint) {
        originalEndpoint = this.endpoint;
        this.endpoint = this.post_endpoint;
      } // Check if we're using modified


      if (this.referenceForModifiedEndpoint && this.modifiedEndpoint) {
        this.useModifiedEndpoint(this.referenceForModifiedEndpoint);
      } // Mark url


      url = this.builder.url; // Reset endpoint

      this.endpoint = originalEndpoint; // Query params

      return url;
    } //#endregion Get Params
    //#region Set Params

    /**
     * We automatically assign modified endpoints through relationships
     * like hasOne/hasMany, but sometimes we may not want to change that
     * endpoint. This allows us to cancel the change.
     *
     * @return {any}
     */

  }, {
    key: "cancelModifiedEndpoint",
    value: function cancelModifiedEndpoint() {
      this.referenceForModifiedEndpoint = undefined;
      this.modifiedEndpoint = null;
      return this;
    }
    /**
     * Set specific endpoint override
     *
     * @param  {string} endpoint
     * @return {any}
     */

  }, {
    key: "useModifiedEndpoint",
    value: function useModifiedEndpoint(activeRecord) {
      // @todo, we shouldn't actually mutate this
      // we should turn the endpoint that we actually use into a getter
      // then have a way of modifying that so we maintain the original class endpoint
      // this.setEndpoint(activeRecord.endpoint + '/' + activeRecord.id + '/' + this.endpoint);
      // Object we reference for modified
      this.referenceForModifiedEndpoint = activeRecord; // Warnings

      if (activeRecord.id == null) {
        console.warn('Modified endpoints usually have an ID signature. Are you sure this is right?');
      } // Set modified endpoint


      this.modifiedEndpoint = activeRecord.endpoint + '/' + activeRecord.id + (activeRecord.id ? '/' : '') + this.endpoint;
      return this;
    }
    /**
     * Set specific boy
     *
     * @param  {string} value
     * @return {any}
     */

  }, {
    key: "setBody",
    value: function setBody(value) {
      this.body = value;
      return this;
    }
    /**
     * Set specific endpoint override
     *
     * @param  {string} endpoint
     * @return {any}
     */

  }, {
    key: "setEndpoint",
    value: function setEndpoint(endpoint) {
      this.referenceForModifiedEndpoint = undefined;
      this.modifiedEndpoint = null;
      this.endpoint = endpoint;
      return this;
    }
    /**
     * Set specific header
     *
     * @param  {string} header
     * @param  {string} value
     * @return {any}
     */

  }, {
    key: "setHeader",
    value: function setHeader(header, value) {
      this.headers[header] = value;
      return this;
    }
    /**
     * Override and set headers
     *
     * @param  {any} headers
     * @return {any}
     */

  }, {
    key: "setHeaders",
    value: function setHeaders(headers) {
      for (var k in headers) {
        this.setHeader(k, headers[k]);
      }

      return this;
    }
    /**
     * Override and set id
     *
     * @param  {any} id
     * @return {any}
     */

  }, {
    key: "setId",
    value: function setId(id) {
      this.id = id;
      return this;
    }
    /**
     * Unset id
     *
     * @param  {any} id
     * @return {any}
     */

  }, {
    key: "unsetId",
    value: function unsetId() {
      this.id = '';
      return this;
    }
    /**
     * Override and set headers
     *
     * @param  {any} headers
     * @return {any}
     */

  }, {
    key: "unsetHeader",
    value: function unsetHeader(header) {
      this.setHeader(header, null);
      delete this.headers[header];
      return this;
    }
    /**
     * Set specific query param
     *
     * @param  {string} key
     * @param  {string} value
     * @return {any}
     */

  }, {
    key: "setQueryParam",
    value: function setQueryParam(key, value) {
      this.builder.qp(key, value);
      return this;
    }
    /**
     * Override and set query params
     *
     * @param  {any} params
     * @return {any}
     */

  }, {
    key: "setQueryParams",
    value: function setQueryParams(params) {
      for (var k in params) {
        this.setQueryParam(k, params[k]);
      }

      return this;
    }
    /**
     * Override and set query param
     *
     * @param  {any} headers
     * @return {any}
     */

  }, {
    key: "unsetQueryParam",
    value: function unsetQueryParam(param) {
      delete this.builder.queryParams[param];
      return this;
    }
    /**
     * Override and set headers
     *
     * @param  {string} token
     * @return {any}
     */

  }, {
    key: "setToken",
    value: function setToken(token) {
      this.setHeader('Authorization', 'Bearer ' + token);
      return this;
    }
    /**
     * Function to call after setting a fetch
     *
     * This is useful if we're doing callbacks from cached promises
     */

  }, {
    key: "setAfterResponse",
    value: function setAfterResponse(request) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var method = request.method || 'get'; // Add model

      if (method.toLowerCase() === 'post') {
        this.add(request.data);
      } else if (method.toLowerCase() === 'delete') {// Intentionally empty
      } else {
        var data = this.dataKey !== undefined ? request.data[this.dataKey] : request.data;
        this.set(data, options);
      } // Set options


      this.options(Object.assign({}, options, {
        meta: request.data.meta
      })); // Events

      this.dispatch('parse:after', this);
    } //#endregion Set Params
    // @todo Update return

  }, {
    key: "_fetch",
    value: function _fetch() {
      var _this5 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var queryParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var body = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      // Promise<void | Request | Response>
      // Normalize method
      method = method ? method.toLowerCase() : 'get'; // Save request params

      this.lastRequest = {
        options: options,
        queryParams: queryParams,
        method: method,
        body: body,
        headers: headers
      }; // Set last request time

      this.requestTime = Date.now(); // Check cacheable

      if (!this.cacheable) {
        this.builder.qp('cb', Date.now());
      } // Check for query params


      for (var key in queryParams) {
        this.builder.qp(key, queryParams[key]);
      } // Check for ID


      if (options && options.id) {
        this.builder.identifier(options.id);
      } // Query params


      var url = this.getUrlByMethod(method); // Events

      this.dispatch('requesting', this); // Has fetched

      this.hasFetched = true; // Set loading

      this.loading = true; // Setup request

      var request = this.request = new _Request["default"](url, {
        dataKey: this.dataKey
      }); // note: this *should* be set by fetch as well, but
      // we have an issue right now we're working out

      this.request.method = method; // After parse

      request.on('parse:after', function (e) {
        method = method || 'get'; // Add model

        if (method.toLowerCase() === 'post') {
          _this5.add(request.data);
        } else if (method.toLowerCase() === 'delete') {// Intentionally empty
        } else {
          _this5.set(_this5.dataKey !== undefined ? request.data[_this5.dataKey] : request.data);
        } // Events


        _this5.dispatch('fetched', _this5);
      }); // Bubble `progress` event

      request.on('progress', function (e) {
        _this5.dispatch('progress', e.data);
      }); // Bubble `complete` event

      request.on('complete', function (e) {
        // Set loading
        _this5.loading = false; // Bubble

        _this5.dispatch('complete');
      }); // After parse

      request.on('parse:after', function (e) {
        return _this5.FetchParseAfter(request, e, options);
      });
      request.on('progress', function (e) {
        return _this5.FetchProgress(request, e, options);
      });
      request.on('complete', function (e) {
        return _this5.FetchComplete(request, e, options);
      });
      request.on('complete:get', function (e) {
        return _this5.dispatch('complete:get');
      });
      request.on('complete:put', function (e) {
        return _this5.dispatch('complete:put');
      });
      request.on('complete:post', function (e) {
        return _this5.dispatch('complete:post');
      });
      request.on('complete:delete', function (e) {
        return _this5.dispatch('complete:delete');
      }); // Request (method, body headers)

      return request.fetch(method, body || this.body, headers || this.headers);
    } //#region Cache

    /**
     * Cached responses by URL
     *
     * Example:
     *
     *     'sotw.com/v1/film..': { complete: false, time: ... }
     */

  }, {
    key: "cache",
    value:
    /**
     * Create cached entry
     *
     * Usage:
     *
     *     this.cache('foo', 'bar');
     *
     * @param {string} key
     * @param {any} value
     * @param {boolean} isComplete
     * @param {number} ttl
     *
     * @return void
     */
    function cache(key, value) {
      var isComplete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var ttl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5000;

      // If exists, save only value as to not overwrite subscribers
      if (ActiveRecord.cachedResponses[key]) {
        ActiveRecord.cachedResponses[key].complete = isComplete;
        ActiveRecord.cachedResponses[key].time = Date.now();
        ActiveRecord.cachedResponses[key].value = value;
      } else {
        ActiveRecord.cachedResponses[key] = {
          complete: false,
          subscribers: [],
          time: Date.now(),
          ttl: ttl,
          value: value
        };
      }
    }
    /**
     * Check if we have a cached item
     *
     * @param {string} Cache key
     *
     * @return boolean
     */

  }, {
    key: "isCached",
    value: function isCached(key) {
      return !!ActiveRecord.cachedResponses[key];
      /*
       * return !!ActiveRecord.cachedResponses[key]
       *     && (ActiveRecord.cachedResponses[key].time + ActiveRecord.cachedResponses[key].ttl) < Date.now();
       */
    }
    /**
     * Says we have a cached item that is currently incomplete
     *
     * @param {string} key
     *
     * @return boolean
     */

  }, {
    key: "isCachePending",
    value: function isCachePending(key) {
      return this.isCached(key) && (!this.getCache(key).complete || this.getCache(key).failed);
    }
    /**
     * Get cached object
     *
     * @param {string} key
     *
     * @return any
     */

  }, {
    key: "getCache",
    value: function getCache(key) {
      return ActiveRecord.cachedResponses[key];
    }
    /**
     * Add subscriber
     *
     * @param {string} key
     * @param {any} resolve
     * @param {any} reject
     * @param {any} collection
     */

  }, {
    key: "addCacheSubscriber",
    value: function addCacheSubscriber(key, resolve, reject, collection) {
      var cache = this.getCache(key);
      cache.subscribers.push({
        collection: collection,
        reject: reject,
        resolve: resolve
      });
    }
    /**
     * Clear subscribers
     *
     * @param {string} key
     */

  }, {
    key: "clearCacheSubscribers",
    value: function clearCacheSubscribers(key) {
      var cache = this.getCache(key);
      cache.subscribers = [];
    } //#endregion Cache

    /*
     * Complete from fetch request
     *
     * @param {Request} request
     * @param {any} e
     */

  }, {
    key: "FetchComplete",
    value: function FetchComplete(request, e) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var method = request.method || 'get'; // Has loaded ever

      this.hasLoaded = true; // Set loading

      this.loading = false; // Bubble

      this.dispatch('complete', request.data);
    }
    /**
     * Progress from fetch request
     *
     * @param {Request} request
     * @param {any} e
     */

  }, {
    key: "FetchProgress",
    value: function FetchProgress(request, e) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      this.dispatch('progress', e.data);
    }
    /**
     * Overrideable fetch parse:after
     *
     * @param {string = 'get'} method
     * @param {Request} request
     */

  }, {
    key: "FetchParseAfter",
    value: function FetchParseAfter(request, e) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var response = request.response;
      var code = response.status; // Only set for acceptable responses

      if (code < 400) {
        this.setAfterResponse(request, options);
      } // Fetched event


      this.dispatch('fetched', this);
    }
  }]);

  return ActiveRecord;
}(_Core2["default"]);

exports["default"] = ActiveRecord;

_defineProperty(ActiveRecord, "cachedResponses", {});