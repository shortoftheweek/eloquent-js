/**
 * Apply Mixins to Classes
 *
 * @param {any}   derivedCtor [description]
 * @param {any[]} baseCtor    [description]
 */
export function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
//# sourceMappingURL=Mixins.js.map