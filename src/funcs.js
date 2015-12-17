(function () {
    'use strict';

    /** @todo set to correct root */
    window.H = {};

    /**
     * H is a port of Haskell's Data.List functions into JavaScript.
     * @namespace H
     */
    var lib = { };

    var utils = {
        curry: function curry (fn) {
            var arity = fn.length;
            return (function resolver() {
                var memory = Array.prototype.slice.call(arguments);
                return function () {
                    var localArgs = memory.slice();
                    Array.prototype.push.apply(localArgs, arguments);

                    var func = localArgs.length >= arity ? fn : resolver;
                    return func.apply(null, localArgs);
                };
            }());
        },

        zeroArray: function (size) {
            return new Array(size + 1).join(0).split('').map(parseFloat);
        }
    };

    /**
     * Append two lists.
     *
     * @category Basic
     * @public
     * @memberof H
     * @param {Array} xs - the first list
     * @param {Array} ys - the second list
     * @return {Array}
     *
     * @example
     *
     * append([1, 2, 3], [4, 5])
     * // => [1, 2, 3, 4, 5]
     */
    lib.append = function append(xs, ys) {
        return xs.concat(ys);
    };

    /**
     * Returns an array of arrays xss, where the first element of xss is the longest 
     * prefix of xs elements that do not satisfy p, and the second element is the remainder 
     * of the list xs.
     * It is the equivalent of span (not p, xs)
     * 
     * @category Sublists
     * @public
     * @memberof H
     * @param {Function} p - predicate function
     * @param {Array} xs - the list
     * @return {Array.<Array>}
     *
     * @example
     * 
     * breakList(x => x < 3, [1, 2, 3, 4, 1, 2])
     * // => [ [1,2,3], [4,1,2] ]
     */
    lib.breakList = function breakList(p, xs) {
        var not = utils.curry(function (p, x) {
            return !p(x);
        });

        return lib.span(not(p), xs);
    };

    /**
     * Returns the suffix of xs after the first n elements, or [] if n > length xs.
     * 
     * @category Sublists
     * @public
     * @memberof H
     * @param {Number} n - number of elements to drop
     * @param {Array} xs - the list
     * @return {Array}
     *
     * @example
     *
     * drop(3, [10 ,20, 30, 40])
     * // => [40]
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
     * @category Sublists
     * @public
     * @memberof H
     * @param {Function} p - predicate function returning a boolean
     * @param {Array} xs - the list
     * @return {Array}
     *
     * @example
     *
     * dropWhile(x => x < 3, [1, 2, 3, 4, 5])
     * // => [3,4,5]
     */
    lib.dropWhile = function dropWhile(p, xs) {
        var len = lib.length(xs);
        if (len === 0) { return []; }

        var list = xs.slice();
        var isDropped = p(list[0]);

        while(isDropped && lib.length(list)) {
            list.shift();
            isDropped = p(list[0]);
        }

        return list;
    };

    /**
     * Drops the largest suffix of a list in which the predicate holds for all elements.
     *
     * @category Sublists
     * @public
     * @memberof H
     * @param {Function} p - predicate function
     * @param {Array} xs - the list
     * @return {Array}
     *
     * @example
     *
     * dropWhileEnd(x => x < 3, [1, 5, 4, 3, 2, 1])
     * // => [1, 5, 4, 3]
     */
    lib.dropWhileEnd = function dropWhileEnd(p, xs) {
        var list = lib.reverse(xs);
        return lib.reverse(lib.dropWhile(p, list));
    };

    /**
     * Extract the first element of a list, which must be non-empty.
     *
     * @category Basic
     * @public
     * @memberof H
     * @param {Array.<T>} xs - the list
     * @return {T}
     * @throws Will throw an error if the list is empty.
     *
     * @example
     *
     * head([1, 2, 3])
     * // => 1
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
     * Takes a list and returns a list of lists such that the concatenation of the result
     * is equal to the argument. Moreover, each sublist in the result contains only equal 
     * elements.
     *
     * @category Sublists
     * @public
     * @memberof H
     * @param {Array} xs - the list
     * @return {Array.<Array>}
     *
     * @example
     *
     * group([1, 1, 1, 2, 2, 3, 1])
     * // => [ [1,1,1], [2,2], [3], [1] ]
     */
    lib.group = function group(xs) {
        function _group(list, acc, accIndex) {
            if (lib.isEmpty(list)) {
                return acc;
            }

            var unc = lib.uncons(list);
            if (lib.isEmpty(acc)) {
                acc.push([unc.head]);
            }
            
            else if (acc[accIndex][0] === unc.head){
                acc[accIndex].push(unc.head);
            }

            else {
                accIndex+=1;
                acc[accIndex] = [];
                acc[accIndex].push(unc.head);
            }

            return _group(unc.tail, acc, accIndex);
        }

        return _group(xs, [], 0);
    };

    /**
     * Returns all the elements of a list except the last one. The list must be non-empty.
     *
     * @category Basic
     * @public
     * @memberof H
     * @param {Array} xs - the list
     * @return {Array}
     * @throws Will throw an error if the list is empty.
     *
     * @example
     * 
     * init([1, 2, 3])
     * // => [1,2]
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
     * Returns all initial segments of the argument, shortest first.
     *
     * @category Sublists
     * @public
     * @memberof H
     * @param {Array} xs
     * @return {Array.<Array>}
     *
     * @example
     *
     * inits([1, 2, 3])
     * // => [ [], [1], [1,2], [1,2,3] ]
     */
    lib.inits = function inits(xs) {
        function _inits(list, acc) {
            acc.unshift(list);
            if (lib.isEmpty(list)) {
                return acc;
            }
            return _inits(lib.init(list), acc);
        }
        return _inits(xs, []);
    };

    /**
     * Test whether a list is empty.
     *
     * @category Basic
     * @public
     * @memberof H
     * @param {Array} xs - the list
     * @return {Boolean}
     *
     * @example
     *
     * isEmpty([])
     * // => true
     */
    lib.isEmpty = function isEmpty(xs) {
        return !xs || !xs.length;
    };

    /**
     * Extract the last element of a list, which must be non-empty.
     *
     * @category Basic
     * @public
     * @memberof H
     * @param {Array.<T>} xs - the list
     * @return {T}
     * @throws Will throw an error if the list is empty.
     *
     * @example
     *
     * last([1, 2, 3])
     * // => 3
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
     * @category Basic
     * @public
     * @memberof H
     * @param {Array} xs - the list
     * @return {Number}
     *
     * @example
     *
     * length([10, 11, 12])
     * // => 33
     */
    lib.length = function length(xs) {
        if (lib.isEmpty(xs)) { return 0; }
        return xs.length;
    };

    /**
     * List index operator, starting from 0.
     *
     * @category Indexing
     * @public
     * @memberof H
     * @param {Number} n - the index
     * @param {Array.<T>} xs - the list
     * @return {T}
     * @throw Will throw an error if n exceeds the length of the list xs
     *
     * @example
     *
     * nth(1, [10, 20, 30])
     * // => 20
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
     * The function `fn` will be curried.
     *
     * @category Transformations
     * @public
     * @memberof H
     * @param {Function} fn - the function to apply to each element in a list
     * @param {Array} xs - the list
     * @return {Array}
     *
     * @example
     *
     * map(x => x + 1, [1, 2, 3])
     * // => [2,3,4]
     *
     * @example
     *
     * map(function (x, y) { return x + y; }, [1, 2])
     * // => [ function (y) { return 1 + y }, function (y) { return 2 + y} ]
     */
    lib.map = function map(fn, xs) {
        var curriedFn = utils.curry(fn);
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
     * @category Folds
     * @public
     * @memberof H
     * @param {Array.<T>} xs
     * @return {T}
     * @throws Will throw an error if the list is empty.
     *
     * @example
     *
     * maximum([10, 20, 30])
     * // => 30
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
     * @category Folds
     * @public
     * @memberof H
     * @param {Array.<T>} xs
     * @return {T}
     * @throws Will throw an error if the list is empty.
     *
     * @example
     *
     * minimum([10, 20, 30])
     * // => 10
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
     * @category Transformations
     * @public
     * @memberof H
     * @param {Array} xs
     * @return {Array}
     *
     * @example
     * reverse([10, 20, 30])
     * // => [30, 20, 10]
     */
    lib.reverse = function reverse(xs) {
        return xs.slice().reverse();
    };

    /**
     * Returns a list of lists where the first element is the longest prefix of xs that 
     * satisfies p, and the second element of the list is the remainder of the list.
     * It is the equivalent of calling [takeWhile(p, xs), dropWhile(p, xs)].
     *
     * @category Sublists
     * @public
     * @memberof H
     * @param {Function} p - predicate function
     * @param {Array.<T>} xs - the list
     * @return {Array.<Array.<T>>}
     *
     * @example
     *
     * span(x => x < 3, [1, 2, 3, 4, 1, 2, 3])
     * // => [ [1,2], [4,1,2,3] ]
     */
    lib.span = function span(p, xs) {
        return [lib.takeWhile(p, xs), lib.dropWhile(p, xs)];
    };

    /**
     * Returns an array where the first element is xs prefix of length n, and the
     * second element is the remainder of the list.
     * It is equivalent to calling [take(n, xs) drop(n, xs)]
     *
     * @category Sublists
     * @public
     * @memberof H
     * @param {Number} n
     * @param {Array.<T>} xs
     * @return {Array.<Array.<T>>}
     *
     * @example
     * splitAt(3, [1, 2, 3, 4, 5])
     * // => [ [1,2,3], [4,5] ]
     */
    lib.splitAt = function splitAt(n, xs) {
        return [lib.take(n, xs), lib.drop(n, xs)];
    };

    /**
     * Drops the given prefix from a list. It returns null if the list does not start 
     * with the prefix or the list without the prefix if it does.
     *
     * @category Sublists
     * @public
     * @memberof H
     * @param {Array} prefix - prefix list
     * @param {Array} xs - queried list
     * @return {?Array}
     *
     * @example
     *
     * stripPrefix([1, 2, 3], [4, 5, 6])
     * // => null
     *
     * @example
     *
     * stripPrefix([1, 2, 3], [1, 2, 3, 4, 5, 6])
     * //=> [4, 5, 6]
     */
    lib.stripPrefix = function stripPrefix(prefix, xs) {
        var pLen = lib.length(prefix);
        var result = [];

        for (var i = 0; i < pLen; i++) {
            // List does not begin with prefix.
            if (prefix[i] !== xs[i]) {
                return null;
            }
        }

        return xs.slice(pLen, lib.length(xs));
    };

    /**
     * Extract the elements after the head of a list, which must be non-empty.
     *
     * @category Basic
     * @public
     * @memberof H
     * @param {Array.<T>} xs - the list
     * @return {Array.<T>}
     * @throws Will throw an error if the list is empty.
     *
     * @example
     *
     * tail([1, 2, 3])
     * // => [2, 3]
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
     * Returns all final segments of the argument, longest first.
     *
     * @category Sublists
     * @public
     * @memberof H
     * @param {Array.<T>} xs
     * @return {Array.<Array.<T>>}
     *
     * @example
     *
     * tails([1, 2, 3])
     * // => [ [1,2,3], [2,3], [3], [] ]
     */
    lib.tails = function tails(xs) {
        function _tails(list, acc) {
            acc.push(list);
            if (lib.isEmpty(list)) {
                return acc;
            }
            return _tails(lib.tail(list), acc);
        }
        return _tails(xs, []);
    };

    /**
     * Returns the first `n` elements of a list `xs`, or the entire list `xs` if n > length(xs)
     *
     * @category Sublists
     * @public
     * @memberof H
     * @param {Array.<T>} xs - the list
     * @return {Array.<T>}
     *
     * @example
     *
     * take(3, [10, 20])
     * // => [10, 20]
     *
     * @example
     *
     * take(2, [10, 20, 30])
     * // => [10, 20]
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
     * @category Sublists
     * @public
     * @memberof H
     * @param {Function} p - function returning a boolean value
     * @param {Array.<T>} xs - the list
     * @return {Array.<T>}
     *
     * @example
     *
     * takeWhile(x => x < 3, [1, 2, 3, 4, 5])
     * // => [1, 2]
     *
     * @example
     *
     * takeWhile(x => x < 0, [1, 2, 3, 4, 5])
     * // => []
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
     *
     * @category Basic
     * @public
     * @memberof H
     * @param {Array.<T>} xs - the list
     * @return {Object.<T, Array.<T>>}
     *
     * @example
     *
     * uncons([1,2, 3])
     * // => { head: 1, tail: [2, 3] }
     */
    lib.uncons = function uncons(xs) {
        if (lib.isEmpty(xs)) {
            return null;
        }

        return {
            head: lib.head(xs),
            tail: lib.tail(xs)
        };
    };

    /**
     * Takes two lists and returns the corresponding pairs. If one input list is short,
     * excess elements of the longer list are discarded.
     *
     * @category Zips
     * @public
     * @memberof H
     * @param {Array} xs - first list
     * @param {Array} ys - second list
     * @return {Array.<Array>}
     *
     * @example
     *
     * zip([1, 2], ['a', 'b', 'c'])
     * // => [[1, 'a'], [2, 'b']]
     */
    lib.zip = function zip(xs, ys) {
        return lib.zipN(xs, ys);
    };

    /**
     * zipN is a generalized version of `zip`.
     * It zips an arbitrary amount of lists.
     *
     * @category Zips
     * @public
     * @memberof H
     * @return {Array.<Array>}
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
        H[key] = utils.curry(lib[key]);
    });

    return H;

}());
