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
     * Returns the suffix of xs after the first n elements, or [] if n > length xs.
     * 
     * @example drop(3, [1,2,3,4]) == [4]
     * @param {int} n - number of elements to drop
     * @param {array} xs - the list
     * @return {array}
     */
    lib.drop = function drop(n, xs) {
        var len = lib.length(xs);
        if (n <= 0) {
            return xs;
        }

        if (n > len) {
            return [];
        }

        var results = [];
        for (var i = n; i < len; i+=1) {
            results.push(xs[i]);
        }

        return results;
    };

    /**
     * Returns the suffix remaining after takeWhile(p, xs).
     *
     * @example dropWhile(function (x) { return x < 3; }, [1,2,3,4,5]) == [3,4,5]
     * @param {Function} p - predicate function returning a boolean
     * @param {array} xs - the list
     * @return {array}
     */
    lib.dropWhile = function dropWhile(p, xs) {
        var len = lib.length(xs);
        if (len === 0) { return []; }

        var list = xs.slice();
        var isDropped = p(list[0]);

        while(isDropped) {
            list.shift();
            isDropped = p(list[0]);
        }

        return list;
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
     * @example reverse([1,2,3]) == [3,2,1]
     * @param {array} xs
     * @return {array}
     */
    lib.reverse = function reverse(xs) {
        return xs.slice().reverse();
    };

    /**
     * Returns an array where the first element is xs prefix of length n, and the
     * second element is the remainder of the list.
     * It is equivalent to calling [take(n, xs) drop(n, xs)]
     *
     * @example splitAt(3, [1,2,3,4,5]) == [[1,2,3], [4,5]]
     * @param {int} n
     * @param {array} xs
     * @return {array}
     */
    lib.splitAt = function splitAt(n, xs) {
        return [lib.take(n, xs), lib.drop(n, xs)];
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
     * Returns the first `n` elements of a list `xs`, or the entire list `xs` if n > length(xs)
     *
     * @example take(3, [1,2]) == [1,2]
     * @example take(2, [1,2,3]) == [1,2]
     * @param {array} xs - the list
     * @return {array}
     */
    lib.take = function take(n, xs) {
        if (n <= 0 || lib.isEmpty(xs)) {
            return [];
        }

        if (n > lib.length(xs)) {
            return xs;
        }

        var result = [];
        for (var i = 0; i < n; i++) {
            result.push(xs[i]);
        }

        return result;
    };

    /**
     * Return the longest prefix of xs of elements that satisfy predicate p.
     *
     * @example takeWhile(function (x) { return x < 3; }, [1,2,3,4,5]) == [1,2]
     * @example takeWhile(function (x) { return x < 0; }, [1,2,3,4,5]) == []
     * @param {Function} p - function returning a boolean value
     * @param {array} xs - the list
     * @return {array}
     */
    lib.takeWhile = function takeWhile(p, xs) {
        var len = lib.length(xs);

        if (len === 0) {
            return [];
        }

        var results = [];
        for (var i = 0; i < len; i+=1) {
            if (p(xs[i])) {
                results.push(xs[i]);
            } else {
                break;
            }
        }

        return results;
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
