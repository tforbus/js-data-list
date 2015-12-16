(function (H) {
    'use strict';

    var lib = { };

    /**
     * Append two lists.
     *
     * @example append([x1, ..., xm], [y1, ..., yn]) == [x1, ..., xm, y1, ..., yn]
     * @param {array} xs - the first list
     * @param {array} ys - the second list
     * @return {array}
     */
    lib.append = function append(xs, ys) {
        return xs.concat(ys);
    };

    /**
     * Extract the first element of a list, which must be non-empty.
     *
     * @example head([1,2,3]) == 1
     * @param {array} xs - the list
     * @return {any}
     */
    lib.head = function head(xs) {
        if (lib.isEmpty(xs)) {
            throw {
                name: 'Exception',
                message: 'H.head: empty list'
            };
        }
        return xs[0];
    };

    /**
     * Returns all the elements of a list except the last one. The list must be non-empty.
     *
     * @example init([1,2,3]) == [1,2]
     * @param {array} xs - the list
     * @return {array}
     */
    lib.init = function init(xs) {
        var len = lib.length(xs);
        if (!len) {
            throw {
                name: 'Exception',
                message: 'H.init: empty list'
            };
        }

        if (len === 1) { 
            return [];
        }

        var clone = xs.slice();
        clone.pop();

        return clone;
    };

    /**
     * Test whether a list is empty.
     * @param {array} xs - the list
     * @return {boolean}
     */
    lib.isEmpty = function isEmpty(xs) {
        return !xs || !xs.length;
    };

    /**
     * Extract the last element of a list, which must be non-empty.
     *
     * @example last([1,2,3]) == 3
     * @param {array} xs - the list
     * @return {any}
     */
    lib.last = function last(xs) {
        var len = lib.length(xs);
        if (!len) {
            throw {
                name: 'Exception',
                message: 'H.last: empty list'
            };
        }

        return xs[len - 1];
    };

    /**
     * Returns the length of a finite list as an int.
     *
     * @example length([10, 11, 12]) == 3
     * @param {array} xs - the list
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
     * @param {array} xs
     * @return {any}
     */
    lib.map = function map(fn, xs) {
        if (H.utils.isString(xs)) {
            return H.utils.arrayToString(lib.map(fn, H.utils.stringToArray(xs)));
        }

        var curriedFn = H.utils.curry(fn);
        var results = [];
        for (var i = 0, len = xs.length; i < len; i+=1) {
            results.push(curriedFn(xs[i]));
        }

        return results;
    };

    // TODO: custom sort
    /**
     * Return the maximum element in a list or string.
     * @param {array} xs
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
     * @param {array} xs
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
     * @param {array} xs
     * @return {array}
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
     * Extract the elements after the head of a list, which must be non-empty.
     *
     * @example tail([1,2,3]) == [2,3]
     * @param {array} xs - the list
     * @return {array}
     */
    lib.tail = function tail(xs) {
        var len = lib.length(xs);
        if (lib.isEmpty(xs)) {
            throw {
                name: 'Exception',
                message: 'H.tail: empty list'
            };
        }

        return xs.slice(1);
    };

    /**
     * Decompose a list into its head and tail.
     * If the list is empty, return null. If the list is non-empty, return a an object
     * containing the head and tail.
     * Results can be accesesd by results[0] or results.head, and results[1] or results.tail.
     *
     * @example uncons([1,2,3]) == {0: 1, 1: [2,3], head: 1, tail: [2,3]}
     * @param {array} xs - the array
     * @return {array}
     */
    lib.uncons = function uncons(xs) {
        if (lib.isEmpty(xs)) {
            return null;
        }

        var head = lib.head(xs);
        var tail = lib.tail(xs);

        return {
            0: head,
            1: tail,
            head: head,
            tail: tail
        };
    };

    /**
     * Takes two lists and returns the corresponding pairs. If one input list is short,
     * excess elements of the longer list are discarded.
     * @example
     * zip([1,2], ['a', 'b', 'c']) == [[1, 'a'], [2, 'b']]
     * @param {array} xs
     * @param {array} ys
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
