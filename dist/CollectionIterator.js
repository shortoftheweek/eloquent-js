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
 * Collection Iterator
 */
var CollectionIterator = /*#__PURE__*/function () {
  /**
   * Current index of iterator
   *
   * @type number
   */

  /**
   * Type of iterator
   * 0 = values
   * 1 = keys
   * 2 = keys + values
   *
   * @type number
   */

  /**
   * Constructor
   */
  function CollectionIterator(collection) {
    var kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, CollectionIterator);

    _defineProperty(this, "index", 0);

    _defineProperty(this, "kind", CollectionIterator.ITERATOR_VALUES);

    this.collection = collection;
    this.kind = kind;
    this.index = 0;
  }
  /**
   * Next item
   */


  _createClass(CollectionIterator, [{
    key: "next",
    value: function next() {
      if (this.collection) {
        // Only continue iterating if the iterated collection is long enough.
        if (this.index < this.collection.length) {
          var model = this.collection.at(this.index);
          this.index++; // Construct a value depending on what kind of values should be iterated.

          var value; // Return model as value

          if (this.kind === CollectionIterator.ITERATOR_VALUES) {
            value = model;
          } else {
            var id = this.collection.modelId;

            if (this.kind === CollectionIterator.ITERATOR_KEYS) {
              value = id;
            } else {
              value = [id, model];
            }
          }

          return {
            value: value,
            done: false
          };
        } // Once exhausted, remove the reference to the collection so future
        // calls to the next method always return done.


        this.collection = void 0;
      }

      return {
        value: void 0,
        done: true
      };
    }
  }]);

  return CollectionIterator;
}();

exports["default"] = CollectionIterator;

_defineProperty(CollectionIterator, "ITERATOR_VALUES", 0);

_defineProperty(CollectionIterator, "ITERATOR_KEYS", 1);

_defineProperty(CollectionIterator, "ITERATOR_KEYSVALUES", 2);