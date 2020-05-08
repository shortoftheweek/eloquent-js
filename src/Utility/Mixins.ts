
/**
 * Apply Mixins to Classes
 *
 * @param {any}   derivedCtor [description]
 * @param {any[]} baseCtor    [description]
 */
export function applyMixins(derivedCtor: any, baseCtors: any[]): void
{
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
