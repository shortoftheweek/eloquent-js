"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _Core2 = _interopRequireDefault(require("../Core.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Request Error
 */
var RequestError = /*#__PURE__*/function (_Error) {
  _inherits(RequestError, _Error);

  var _super = _createSuper(RequestError);

  function RequestError(status, text) {
    var _this;

    _classCallCheck(this, RequestError);

    _this = _super.call(this, text);
    _this.status = status;
    _this.text = text;
    return _this;
  }

  return RequestError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Request
 *
 * @todo
 */


var Request = /*#__PURE__*/function (_Core) {
  _inherits(Request, _Core);

  var _super2 = _createSuper(Request);

  /**
   * Parsed data from response
   *
   * @type {object}
   */

  /**
   * Where to find the data
   *
   * @type {string}
   */

  /**
   * Headers
   *
   * Do not set the 'Content-Type' here because it wont be
   * overridden; which will break file uploads.
   *
   * @type {string}
   */

  /**
   * If this request is currently loading
   *
   * @type {boolean}
   */

  /**
   * Method
   *
   * Example: 'get'
   *
   * @type {string}
   */

  /**
   * Mode
   *
   * Example: cors, no-cors, same-origin, navigate
   *
   * @type {string}
   */

  /**
   * Constructor
   */
  function Request(url) {
    var _this2;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Request);

    _this2 = _super2.call(this); //

    _defineProperty(_assertThisInitialized(_this2), "data", {});

    _defineProperty(_assertThisInitialized(_this2), "dataKey", '');

    _defineProperty(_assertThisInitialized(_this2), "headers", {});

    _defineProperty(_assertThisInitialized(_this2), "loading", false);

    _defineProperty(_assertThisInitialized(_this2), "method", 'get');

    _defineProperty(_assertThisInitialized(_this2), "mode", '');

    _this2.dataKey = params.dataKey;
    _this2.url = url; // Fix URL

    _this2.url = _this2.url.replace(/\?$/, '');
    _this2.url = _this2.url.replace(/\?&/, '?');
    return _this2;
  }
  /**
   * Actually fetch the data
   */


  _createClass(Request, [{
    key: "fetch",
    value: function fetch() {
      var _this3 = this;

      var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'GET';
      var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return function (headers) {
        _this3.method = method || 'GET';

        _this3.dispatch('fetch:before'); // Combine headers


        var headers = Object.assign(_this3.headers, headers); // Fetch params

        var params = {};
        params.headers = headers;
        params.method = method || 'GET';
        params.redirect = 'follow';
        body instanceof FormData ? body : _typeof(body) == 'object' ? JSON.stringify(body) : body;

        if (body) {
          // For node
          if ((typeof FormData === "undefined" ? "undefined" : _typeof(FormData)) == undefined) {
            params.body = _typeof(body) == 'object' ? JSON.stringify(body) : body;
          } // For web
          else {
              params.body = body instanceof FormData ? body : _typeof(body) == 'object' ? JSON.stringify(body) : body;
            }
        } // Is File?
        // @todo this is inaccurate and makes many requests (forgot password) think it's a file


        var isFile = (!params.headers['Content-Type'] || params.headers['Content-Type'].indexOf('multipart')) && params.method.toLowerCase() === 'post'; // Loading

        _this3.loading = true; // Events

        _this3.dispatch('requesting', _this3); // Log
        // console.log('Making request as follows:', params);
        // Create request


        var response = isFile ? _this3.xhrFetch(_this3.url, params) : (0, _nodeFetch["default"])(_this3.url, params);
        return response.then(_this3.beforeParse.bind(_this3)).then(_this3.parse.bind(_this3)).then(_this3.afterParse.bind(_this3)).then(_this3.afterFetch.bind(_this3)).then(_this3.afterAll.bind(_this3));
      }(headers);
    }
    /**
     * XHR Fetch
     *
     * Specifically for file uploaders
     *
     * XMLHttpRequest
     *     onabort: null
     *     onerror: ƒ ()
     *     onload: ƒ ()
     *     onloadend: ƒ (e)
     *     onloadstart: null
     *     onprogress: ƒ (e)
     *     onreadystatechange: null
     *     ontimeout: null
     *     readyState: 4
     *     response: "{"id":262,"url":"https:\/\/static.sotw.com\/media\/film\/154\/5f2d54d1c26dc.jpg",
     *     responseText: "{"id":262,"url":"https:\/\/static.sotw.com\/media\/film\/154\/5f2d54d1c26dc.jpg",
     *     responseType: ""
     *     responseURL: "https://api.sotw.com/v1/film/154/media?&mediaType=1&imageType=4&videoType=4&limit=15&page=1"
     *     responseXML: null
     *     send: ƒ ()
     *     status: 200
     *     statusText: "OK"
     *     timeout: 0
     *     upload: XMLHttpRequestUpload {onloadstart: null, onprogress: null, onabort: null, onerror: null, onload: null, …}
     *     withCredentials: false
     *
     * Response
     *     body: (...)
     *     bodyUsed: false
     *     headers: Headers {}
     *     ok: true
     *     redirected: false
     *     status: 200
     *     statusText: ""
     *     type: "default"
     *     url: ""
     *
     * @param  {string} url
     * @param  {any} params
     * @return {any}
     */

  }, {
    key: "xhrFetch",
    value: function xhrFetch(url, params) {
      var self = this;
      var xhr = new XMLHttpRequest(); // Open Request

      xhr.open(params.method, url); // Set Headers

      for (var key in params.headers) {
        xhr.setRequestHeader(key, params.headers[key]);
      } // Copy old `send`


      var xhrSend = xhr.send; // Create new `send`

      xhr.send = function () {
        var xhrArguments = arguments;
        return new Promise(function (resolve, reject) {
          xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
              self.dispatch('progress', {
                loaded: e.loaded,
                ratio: e.loaded / e.total,
                total: e.total
              });
            } else {
              self.dispatch('progress', {
                loaded: e.loaded,
                ratio: 1,
                total: e.total
              });
            }
          }; // xhr.onloadend = function(e: ProgressEvent) {
          //     const xhr: XMLHttpRequest = <XMLHttpRequest> e.currentTarget;
          //     var status = xhr.status;
          //     var json = JSON.parse(xhr.response);
          //     // Error
          //     if (status >= 400) {
          //         reject({
          //             status: status,
          //             statusText: json.status,
          //         });
          //         // throw new RequestError(status, json.status);
          //     }
          // }


          xhr.onload = function () {
            var blob = new Blob([xhr.response], {
              type: 'application/json'
            });
            var init = {
              status: xhr.status,
              statusText: xhr.statusText
            };
            var response = new Response(xhr.response ? blob : null, init); // Resolved

            resolve(response); // if (xhr.status < 200 || xhr.status >= 300) {
            //     reject({ response });
            // }
            // else {
            //     resolve(response);
            // }
          };

          xhr.onerror = function () {
            reject({
              request: xhr
            });
          };

          xhrSend.apply(xhr, xhrArguments);
        });
      };

      return xhr.send(params.body);
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
      this.headers = headers;
    }
    /**
     * Before parsing data
     *
     * @todo Check if we have valid JSON
     * @todo Check if the request was an error
     *
     * @param {any} x [description]
     */

  }, {
    key: "beforeParse",
    value: function beforeParse(response) {
      // Trigger
      this.dispatch('parse:before'); // Save

      this.response = response;
      return this;
    }
    /**
     * Parse data
     *
     * @param {any} x [description]
     */

  }, {
    key: "parse",
    value: function () {
      var _parse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // Trigger
                this.dispatch('parse:parsing'); // Set data

                if (!request.response) {
                  _context.next = 6;
                  break;
                }

                if (!(request.response.status != 204)) {
                  _context.next = 6;
                  break;
                }

                _context.next = 5;
                return request.response.json();

              case 5:
                this.data = _context.sent;

              case 6:
                // Trigger
                this.dispatch('parse', this.data);
                return _context.abrupt("return", request);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function parse(_x) {
        return _parse.apply(this, arguments);
      }

      return parse;
    }()
    /**
     * After data parsed
     *
     * @param {any} x [description]
     */

  }, {
    key: "afterParse",
    value: function afterParse(request) {
      if (request && request.response && request.response.status >= 400 && this.data.status) {
        // if (this.data && this.data.code >= 400) {
        throw new RequestError(request.response.status, this.data.status);
      } // Trigger


      this.dispatch('parse:after');
      return request;
    }
    /**
     * After data fetched
     *
     * @param {any} x [description]
     */

  }, {
    key: "afterFetch",
    value: function afterFetch(request) {
      // Trigger
      this.dispatch('fetch', request.data); // Trigger

      this.dispatch('fetch:after'); // Not loading

      this.loading = false;
      return request;
    }
    /**
     * After all
     *
     * @param {any} x [description]
     */

  }, {
    key: "afterAll",
    value: function afterAll(request) {
      // Check request
      if (request && request.response && request.response.ok) {
        this.dispatch('complete', this);
        this.dispatch('complete:' + this.method, this);
      } else {
        this.dispatch('error', request.data);
        throw new Error(request && request.data ? request.data.error || request.data.message : 'After All');
      }

      return request;
    }
  }]);

  return Request;
}(_Core2["default"]);

exports["default"] = Request;