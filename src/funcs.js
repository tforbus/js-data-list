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
     *
     * @example isEmpty([]) == true
     * @example isEmpty([1]) == false
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
     * List index operator, starting from 0.
     *
     * @example nth(1, [1,2,3]) == 2
     * @param {int} n - the index
     * @param {array} xs - the list
     * @return {any}
     */
    lib.nth = function nth(n, xs) {
        if (n > lib.length(xs)) {
            throw {
                name: 'Exception',
                message: 'H.nth: index too large'
            };
        }

        return xs[n];
    };

    /**
     * map(fn, xs) is the list obtained by applying `fn` to each element of xs.
     * The function `fn` is curried by default, which allows greater flexibility.
     *
     * @example map(function (x) { return x + 1 }, [1,2,3]) == [2,3,4]
     * @example map(function (x, y) { return x + y; }, [1,2,3]) == [function(y) { return 1 + y; }, ...];
     * @param {function} fn - the function to apply to each element in a list
     * @param {array} xs - the list
     * @return {array}
     */
    lib.map = function map(fn, xs) {
        var curriedFn = H.utils.curry(fn);
        var results = [];
        for (var i = 0, len = lib.length(xs); i < len; i+=1) {
            results.push(curriedFn(xs[i]));
        }

        return results;
    };

    /**
     * Returns the maximum value from a list, which must be non-empty, finite, 
     * and of an ordered type (able to be compared with simple operators >, <, =).
     * 
     * @example maximum([1,2,3]) == 3
     * @param {array} xs
     * @return {any}
     */
    lib.maximum = function maximum(xs) {
        if (lib.isEmpty(xs)) {
            throw {
                name: 'Exception',
                message: 'H.maximum: empty list'
            };
        }
        if (lib.length(xs) === 1) { return xs[0]; }

        var unc = lib.uncons(xs);

        // TODO: lib.reduce
        return unc.tail.reduce(function (previous, current) {
            if (previous < current) { return current; }
            return previous;
        }, unc.head);
    };

    /**
     * Returns the minimum value from a list, which must be non-empty, finite, 
     * and of an ordered type (able to be compared with simple operators >, <, =).
     *
     * @example minimum([1, 2, 3]) == 1
     * @param {array} xs
     * @return {any}
     */
    lib.minimum = function minimum(xs) {
        if (lib.isEmpty(xs)) {
            throw {
                name: 'Exception',
                message: 'H.minimum: empty list'
            };
        }
        if (lib.length(xs) === 1) { return xs[0]; }

        var unc = lib.uncons(xs);

        // TODO: lib.reduce
        return unc.tail.reduce(function (previous, current) {
            if (previous > current) { return current; }
            return previous;
        }, unc.head);
    };

    /**
     * Returns the elements of a list in reverse order. The list must be finite.
     *
     * @example revserse([1,2,3]) == [3,2,1]
     * @param {array} xs
     * @return {array}
     */
    lib.reverse = function reverse(xs) {
        return xs.reverse();
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
     * @param {array} xs - the list
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
     *
     * @example * zip([1,2], ['a', 'b', 'c']) == [[1, 'a'], [2, 'b']]
     * @param {array} xs - first list
     * @param {array} ys - second list
     * @return {array}
     */
    lib.zip = function zip(xs, ys) {
        return lib.zipN(xs, ys);
    };

    /**
     * zipN is a generalized version of `zip`.
     * It zips an arbitrary amount of lists.
     *
     * @return {array}
     */
    lib.zipN = function zipN() {
        var lists = Array.prototype.slice.call(arguments);
        var minLen = lib.minimum(lib.map(function (xs) { return lib.length(xs); }, lists));
        var results = [];

        // Get the nth element for all lists in a list.
        function _allAt(n, xss) {
            return lib.map(function (xs) {
                return lib.nth(n, xs);
            }, xss);
        }

        for (var i = 0; i < minLen; i+=1) {
            results.push(_allAt(i, lists));
        }

        return results;
    };

    Object.keys(lib).forEach(function (key) {
        H[key] = H.utils.curry(lib[key]);
    });

    return H;

}(H || {}));
