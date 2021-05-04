"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyMixins = applyMixins;

/**
 * Apply Mixins to Classes
 *
 * @param {any}   derivedCtor [description]
 * @param {any[]} baseCtor    [description]
 */
function applyMixins(derivedCtor, baseCtors) {
  baseCtors.forEach(function (baseCtor) {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}