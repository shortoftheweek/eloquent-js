"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Builder
 */
var Builder = /*#__PURE__*/function () {
  /**
   * Constructor
   */
  function Builder(activeRecord) {
    _classCallCheck(this, Builder);

    _defineProperty(this, "id", '');

    _defineProperty(this, "includes", []);

    _defineProperty(this, "queryParams", {});

    this.activeRecord = activeRecord;
  }
  /**
   * Query params
   *
   * @todo Move to a builder?
   *
   * @type string
   */


  _createClass(Builder, [{
    key: "baseUrl",
    get:
    /**
     * Base Url
     *
     * @type string
     */
    function get() {
      return this.activeRecord.baseUrl;
    }
    /**
     * Endpoint
     *
     * @type string
     */

  }, {
    key: "endpoint",
    get: function get() {
      return this.activeRecord.modifiedEndpoint || this.activeRecord.endpoint;
    }
    /**
     * ID
     *
     * @type string
     */

  }, {
    key: "queryParamsAsString",
    get: function get() {
      var str = ''; // Combine query params
      // for (let [key, value] of this.queryParams) {

      for (var key in this.queryParams) {
        var value = this.queryParams[key];

        if (value != null && value != '') {
          str += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(value);
        }
      } // Add includes


      if (this.includes.length) {
        str += '&include=' + this.includes.join(',');
      }

      return str;
    }
    /**
     * Requestable URL
     *
     * @return string
     */

  }, {
    key: "url",
    get: function get() {
      var baseUrl = this.baseUrl;
      var endpoint = this.endpoint;
      var queryParamStr = this.queryParamsAsString;
      var urlBuilder = ''; // Root API URI

      urlBuilder += baseUrl;
      urlBuilder += endpoint[0] === '/' ? endpoint : '/' + endpoint; // Check for ID

      if (this.id !== '') {
        urlBuilder += '/' + this.id;
      } // Separate query string


      urlBuilder += '?' + queryParamStr; // Clean URL
      // mk: We tried split/join at first but that created errors
      // on "https://" and "//api.sotw.com..."

      urlBuilder = urlBuilder.replace(/([a-zA-Z0-9])\/\//g, '$1/');
      return urlBuilder;
    }
    /**
     * Add an ID
     *
     * @param  number id
     * @return Builder
     */

  }, {
    key: "identifier",
    value: function identifier(id) {
      this.id = id.toString();
      return this;
    }
    /**
     * Add an include
     *
     * @param  string  $value
     * @return Builder
     */

  }, {
    key: "include",
    value: function include(value) {
      this.includes.push(value);
      return this;
    }
    /**
     * Add a query parameter
     *
     * @param  string  key
     * @param  string  value
     * @return Builder
     */

  }, {
    key: "queryParam",
    value: function queryParam(key, value) {
      this.queryParams[key] = value;
      return this;
    }
    /**
     * Short hand for query parameter
     *
     * @param  string key
     * @param  string | number value
     * @return Builder
     */

  }, {
    key: "qp",
    value: function qp(key, value) {
      return this.queryParam(key, value);
    }
  }]);

  return Builder;
}();

exports["default"] = Builder;