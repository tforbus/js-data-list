/*
 * Currying is supported by default in Haskell.
 * This function allows creates a chain of partially applied functions that
 * eventually resolve into a value.
 *
 * Example:
 * function add(x, y) { return x + y; }
 * var increment = curry(add(1));
 * var x = increment(4); // x = 5
 */
export default function curry(fn) {
    let arity = fn.length;

    return (function resolver() {
        let memory = Array.prototype.slice.call(arguments);

        return function () {
            let localArgs = memory.slice();
            let func;

            Array.prototype.push.apply(localArgs, arguments);

            if (localArgs.length >= arity) {
                func = fn;
            } else {
                func = resolver;
            }

            return func.apply(null, localArgs);
        };
    }());
}
