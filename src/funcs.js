(function (H) {
    'use strict';

    var lib = { };

    /**
     * Concatenates two lists or strings together and returns the result.
     * @param {(array|string)} xs
     * @param {(array|string)} ys
     * @return {(array|string)}
     */
    lib.concat = function concat(xs, ys) {
        return xs.concat(ys);
    };

    /**
     * Get the first element of a list or string.
     *
     * @param {(array|string)} xs
     * @return {any}
     */
    lib.head = function head(xs) {
        if (lib.isEmpty(xs)) { return xs; }
        return xs[0];
    };

    /**
     * Return all elements in a list or string, except the last element.
     * @param {(array|string)} xs
     * @return {(array|string)}
     */
    lib.init = function init(xs) {
        var len = lib.length(xs);
        if (!len) { return xs; }

        if (H.utils.isArray(xs)) {
            if (len === 1) { return []; }
            var clone = xs.slice();
            clone.pop();
            return clone;
        }
        
        if (H.utils.isString(xs)) {
            return xs.substring(0, len - 1);
        }
    };

    /**
     * Return if a list or string is falsey or has no length.
     * @param {(array|string)} xs
     * @return {boolean}
     */
    lib.isEmpty = function isEmpty(xs) {
        return !xs || !xs.length || xs.length === 0;
    };

    /**
     * Return the last element in a list or string.
     * @param {(array|string)} xs
     * @return {any}
     */
    lib.last = function last(xs) {
        var len = lib.length(xs);
        if (!len) { return xs; }

        return xs[len - 1];
    };

    /**
     * Return the length of a list or string.
     * @param {(array|string)} xs
     * @return {int}
     */
    lib.length = function length(xs) {
        if (lib.isEmpty(xs)) { return 0; }
        return xs.length;
    };

    /**
     * Map a function to each element of a list or string and return the results.
     * If xs is a string, the result returned will be cast back to a string.
     * @param {function} fn
     * @param {(array|string)} xs
     * @return {any}
     */
    lib.map = function map(fn, xs) {
        if (H.utils.isArray(xs)) {
            return xs.map(fn);
        }

        if (H.utils.isString(xs)) {
            return H.utils.arrayToString(H.utils.stringToArray(xs).map(fn));
        }
    };

    // TODO: custom sort
    /**
     * Return the maximum element in a list or string.
     * @param {(array|string)} xs
     * @return {any}
     */
    lib.maximum = function maximum(xs) {
        if (lib.isEmpty(xs)) { return xs; }
        if (lib.length(xs) === 1) { return xs[0]; }

        var ht = lib.uncons(xs);
        var head = ht[0];
        var tail = ht[1];

        if (H.utils.isString(tail)) {
            tail = H.utils.stringToArray(tail);
        }

        // TODO: lib.reduce
        return tail.reduce(function (previous, current) {
            if (previous < current) { return current; }
            return previous;
        }, head);
    };

    // TODO: custom sort
    /**
     * Return the minimum element in a list or string.
     * @param {(array|string)} xs
     * @return {any}
     */
    lib.minimum = function minimum(xs) {
        if (lib.isEmpty(xs)) { return xs; }
        if (lib.length(xs) === 1) { return xs[0]; }

        var ht = lib.uncons(xs);
        var head = ht[0];
        var tail = ht[1];

        if (H.utils.isString(tail)) {
            tail = H.utils.stringToArray(tail);
        }

        // TODO: lib.reduce
        return tail.reduce(function (previous, current) {
            if (previous > current) { return current; }
            return previous;
        }, head);
    };

    /**
     * Reverse a list or string and return the results.
     * @param {(array|string)} xs
     * @return {(array|string)}
     */
    lib.reverse = function reverse(xs) {
        if (H.utils.isArray(xs)) {
            return xs.reverse();
        }

        if (H.utils.isString(xs)) {
            return H.utils.arrayToString(H.utils.stringToArray(xs).reverse());
        }
    };

    /**
     * Return all elements but the first in a list or string.
     * @param {(array|string)} xs
     * @return {(array|string)}
     */
    lib.tail = function tail(xs) {
        var len = lib.length(xs);
        if (lib.isEmpty(xs)) { return xs; }

        if (H.utils.isArray(xs)) {
            return xs.slice(1);
        }

        if (H.utils.isString(xs)) {
            return xs.substring(1, len);
        }
    };

    /**
     * Return the first element of a list or string  along with the rest of the list or string.
     * @example
     * uncons([1,2,3]) == [1, [2,3]]
     * @param {(array|string)} xs
     * @return {array}
     */
    lib.uncons = function uncons(xs) {
        if (lib.isEmpty(xs)) { return xs; }
        return [lib.head(xs), lib.tail(xs)];
    };

    /**
     * Takes two lists and returns the corresponding pairs. If one input list is short,
     * excess elements of the longer list are discarded.
     * @example
     * zip([1,2], ['a', 'b', 'c']) == [[1, 'a'], [2, 'b']]
     * @param {(array|string)} xs
     * @param ({array|string)} ys
     * @return {array}
     */
    lib.zip = function zip(xs, ys) {
        var minLen = lib.minimum([xs.length, ys.length]);
        return H.utils.zeroArray(minLen).map(function (x, index) {
            return [xs[index], ys[index]];
        });
    };

    Object.keys(lib).forEach(function (key) {
        H[key] = H.utils.curry(lib[key]);
    });

    return H;

}(H || {}));
