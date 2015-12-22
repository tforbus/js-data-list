(function () {
    'use strict';

    /**
     * H is a port of Haskell's Data.List into JavaScript.
     * @namespace H
     */
    var H = {};

    /**
     * Utility functions used within H.
     * @private
     * @namespace utils
     */
    var utils = {
        /**
         * Curries a function.
         * @private
         * @memberof utils
         * @param {Function} fn
         * @return {Function}
         */
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

        /**
         * Supplied with a predicate function p, return a function that will inverse
         * the results of p(x)
         * @private
         * @memberof utils
         * @param {Function} p - predicate function
         * @return {Function}
         */
        not: function (p) {
            var curried = utils.curry(function (p, x) {
                return !p(x);
            });

            return curried(p);
        },

        /**
         * The inverse of lisp's `cons` operator.
         * Append element x at the end of xs.
         * @private
         * @memberof utils
         * @param {*} x
         * @param {Array} xs
         * @return {Array}
         */
        snoc: function (x, xs) {
            var list = [].concat(xs);
            list.push(x);
            return list;
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
    H.append = function append(xs, ys) {
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
    H.breakList = function breakList(p, xs) {
        return H.span(utils.not(p), xs);
    };

    /**
     * Concatenates a list of lists.
     *
     * @category Folds
     * @public
     * @memberof H
     * @param {Array.<Array.<T>>} xss - list of lists
     * @return {Array<T>}
     *
     * @example
     *
     * concat([ [1, 2, 3], [4, 5, 6], [7, 8, 9] ])
     * // => [1, 2, 3, 4, 5, 6, 7, 8, 9]
     */
    H.concat = function concat(xss) {
        if (H.isEmpty(xss)) { return []; }
        var unc = H.uncons(xss);
        return H.append(unc.head, H.concat(unc.tail));
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
    H.drop = function drop(n, xs) {
        var len = H.length(xs);
        if (n <= 0) {
            return xs;
        }

        if (n > len) {
            return [];
        }

        return xs.slice(n);
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
    H.dropWhile = function dropWhile(p, xs) {
        if (H.isEmpty(xs) || !p(H.head(xs))) {
            return xs;
        }
        return dropWhile(p, H.tail(xs));
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
    H.dropWhileEnd = function dropWhileEnd(p, xs) {
        var list = H.reverse(xs);
        return H.reverse(H.dropWhile(p, list));
    };

    /**
     * Return the elements in xs which satisfy predicate p.
     *
     * @category Searching
     * @public
     * @memberof H
     * @param {Function} p - the predicate
     * @param {Array} xs - the list
     * @return {Array}
     *
     * @example
     * filter(x => x % 2 == 1, [1, 2, 3, 4, 5])
     * // => [1, 3, 5]
     */
    H.filter = function filter(p, xs) {
        function _filter(p, xs, acc) {
            if (H.isEmpty(xs)) {
                return acc;
            }

            var unc = H.uncons(xs);
            var appended = p(unc.head) ? utils.snoc(unc.head, acc) : acc;
            return _filter(p, unc.tail, appended);
        }

        return _filter(p, xs, []);
    };

    /**
     * Return the first element in a list xs which matches predicate p.
     * Return null if the element does not exist.
     *
     * @category Searching
     * @public
     * @memberof H
     * @param {Function} p - the predicate function
     * @param {Array.<T>} xs - the list
     * @return {?T}
     *
     * @example
     * find(x => x > 4, [1, 2, 3, 4, 5, 6])
     * // => 5
     */
    H.find = function find(p, xs) {
        if (H.isEmpty(xs)) {
            return null;
        }

        var unc = H.uncons(xs);
        if (p(unc.head)) {
            return unc.head;
        }

        return find(p, unc.tail);
    };

    /**
     * Right-associative fold of a list.
     *
     * @category Folds
     * @public
     * @memberof H
     * @param {Function} f - function to apply
     * @param {*} z - initial value
     * @param {Array} xs - list
     * @return {*}
     *
     * @example
     * // (2 / (3 / (1 / 4)))
     * foldr(x y => x / y, 1, [2, 3, 4])
     * // => 2.666
     */
    H.foldr = function foldr(f, z, xs) {
        if (H.isEmpty(xs)) { return z; }
        var unc = H.uncons(xs);
        return f(unc.head, (foldr(f, z, unc.tail)));
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
    H.head = function head(xs) {
        if (H.isEmpty(xs)) {
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
    H.group = function group(xs) {
        function _group(list, acc, accIndex) {
            if (H.isEmpty(list)) {
                return acc;
            }

            var unc = H.uncons(list);
            if (H.isEmpty(acc)) {
                acc.push([unc.head]);
            }
            
            else if (H.head(acc[accIndex]) === unc.head){
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
    H.init = function init(xs) {
        var len = H.length(xs);
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
    H.inits = function inits(xs) {
        function _inits(list, acc) {
            acc.unshift(list);
            if (H.isEmpty(list)) {
                return acc;
            }
            return _inits(H.init(list), acc);
        }
        return _inits(xs, []);
    };

    /**
     * Inserts the list xs between the lists within xss and concatenates the result.
     *
     * @category Transformations
     * @public
     * @memberof H
     * @param {Array} xs - list to insert
     * @param {Array.<Array>} xss - list of lists
     * @return {Array}
     *
     * @example
     * intercalate([0, 0], [ [1, 2], [3, 4], [5] ])
     * // => [1, 2, 0, 0, 3, 4, 0, 0, 5]
     */
    H.intercalate = function intercalate(xs, xss) {
        return H.concat(H.intersperse(xs, xss));
    };

    /**
     * Inserts x between each element of xs.
     *
     * @category Transformations
     * @public
     * @memberof H
     * @param {*} x - element to intersperse
     * @param {Array} xs - list
     * @return {Array}
     * 
     * @example
     * 
     * intersperse(0, [1, 2, 3])
     * // => [1, 0, 2, 0, 3]
     */
    H.intersperse = function intersperse(x, xs) {
        if (H.length(xs) <= 1) { return xs; }
        return H.append([H.head(xs), x], H.intersperse(x, H.tail(xs)));
    };

    /**
     * List membership predicate. Returns if the element exists in the list.
     *
     * @category Searching
     * @public
     * @memberof H
     * @param {T} x - the element to check for
     * @param {Array.<T>} xs - the list
     * @return {Boolean}
     *
     * @example
     *
     * isElem(1, [1, 2, 3])
     * // => true
     */
    H.isElem = function isElem(x, xs) {
        return xs.indexOf(x) >= 0;
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
    H.isEmpty = function isEmpty(xs) {
        return !xs || !xs.length;
    };

    /**
     * The negation of `isElem`.
     *
     * @category Searching
     * @public
     * @memberof H
     * @param {T} x - the element to check for
     * @param {Array.<T>} xs - the list
     * @return {Boolean}
     *
     * @example
     *
     * isElem(1, [1, 2, 3])
     * // => false
     */
    H.isNotElem = function isNotElem(x, xs) {
        return !H.isElem(x, xs);
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
    H.last = function last(xs) {
        var len = H.length(xs);
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
     * // => 3
     */
    H.length = function length(xs) {
        if (H.isEmpty(xs)) { return 0; }
        return xs.length;
    };

    /**
     * Looks up a key in an object.
     *
     * @category Searching
     * @public
     * @memberof H
     * @param {String} key - object property
     * @param {Object} hash
     * @return {Object.<T>?}
     *
     * @example
     *
     * lookup('foo', { foo: 1, bar: 2 })
     * // => 1
     *
     * @example
     *
     * lookup('foo', { bar: 2, baz: 3 })
     * // => undefined
     */
    H.lookup = function lookup(key, hash) {
        var keys = Object.keys(hash);
        if (H.isElem(key, keys)) {
            return hash[key];
        }

        return undefined;
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
    H.nth = function nth(n, xs) {
        if (n > H.length(xs)) {
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
    H.map = function map(fn, xs) {
        var curriedFn = utils.curry(fn);
        function _map(f, xs, acc) {
            if (H.isEmpty(xs)) {
                return acc;
            }

            var unc = H.uncons(xs);
            return _map(f, unc.tail, H.append(acc, [f(unc.head)]));
        }

        return _map(curriedFn, xs, []);
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
    H.maximum = function maximum(xs) {
        if (H.isEmpty(xs)) {
            throw {
                name: 'Exception',
                message: 'H.maximum: empty list'
            };
        }
        if (H.length(xs) === 1) { return xs[0]; }

        var unc = H.uncons(xs);

        return H.foldr(function (previous, current) {
            if (previous < current) { return current; }
            return previous;
        }, unc.head, unc.tail);
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
    H.minimum = function minimum(xs) {
        if (H.isEmpty(xs)) {
            throw {
                name: 'Exception',
                message: 'H.minimum: empty list'
            };
        }
        if (H.length(xs) === 1) { return xs[0]; }

        var unc = H.uncons(xs);

        return H.foldr(function (previous, current) {
            if (previous > current) { return current; }
            return previous;
        }, unc.head, unc.tail);
    };

    /**
     * Returns a pair of lists, where the first list is a list containing elements from
     * xs which satisfy predicate p, and the second list contains elements from xs which do
     * not satisfy p.
     *
     * @category Searching
     * @public
     * @memberof H
     * @param {Function} p - the predicate
     * @param {Array} xs - the list
     * @return {Array.<Array>}
     *
     * @example
     *
     * partition(x => x > 3, [1, 2, 3, 4, 5])
     * // => [ [4, 5], [1, 2, 3] ]
     */
    H.partition = function partition(p, xs) {
        return [ H.filter(p, xs), H.filter(utils.not(p), xs) ];
    };

    /**
     * Returns a list of all permutations of a provided list.
     *
     * @category Transformations
     * @public
     * @memberof H
     * @param {Array.<T>} xs
     * @return {Array.Array.<T>}
     *
     * @example
     *
     * permutations([1,2,3])
     *  // => [ [1,2,3], [2,1,3], [3,2,1], [2,3,1], [3,1,2], [1,3,2] ]
     */
    H.permutations = function permutations(xs) {
        var len = H.length(xs);
        if (len === 0) { return utils.snoc([], []); }
        if (len === 1) { return utils.snoc(xs, []); }

        // Insert an element at each index in xs.
        // (0, [1,2]) = [0,1,2], [1,0,2], [1,2,0]
        function _insertInEach(x, xs, n, acc) {
            if (n > H.length(xs)) { return acc; }
            var split = H.splitAt(n, xs);
            var result = H.append(utils.snoc(x, split[0]), split[1]);
            return _insertInEach(x, xs, n + 1, utils.snoc(result, acc));
        }

        function _insertInEachAll(x, xss) {
            // TODO: concatmap
            return H.concat(H.map(function (xs) {
                return _insertInEach(x, xs, 0, []);
            }, xss));
        }

        var head = H.head(xs);
        var rest = permutations(H.tail(xs));
        return _insertInEachAll(head, rest);
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
    H.reverse = function reverse(xs) {
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
    H.span = function span(p, xs) {
        return [H.takeWhile(p, xs), H.dropWhile(p, xs)];
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
    H.splitAt = function splitAt(n, xs) {
        return [H.take(n, xs), H.drop(n, xs)];
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
    H.stripPrefix = function stripPrefix(prefix, xs) {
        if (H.length(prefix) > H.length(xs)) {
            return null;
        }

        if (H.isEmpty(prefix)) {
            return xs;
        }

        if (H.head(prefix) !== H.head(xs)) {
            return null;
        }

        return stripPrefix(H.tail(prefix), H.tail(xs));
    };

    /**
     * Returns the list of all subsequences of the argument (the powerset).
     *
     * @category Transformations
     * @public
     * @memberof H
     * @param {Array.<T>} xs - the list
     * @return {Array.Array.<T>}
     *
     * @example
     *
     * subsequences([1])
     * // => [ [], [1] ]
     *
     * @example
     *
     * subsequences([1,2,3])
     * // => [ [], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3] ]
     */
    H.subsequences = function subsequences(xs) {
        var len = H.length(xs);

        // Handle initial empty length case.
        if (len === 0) {
            return [ [] ];
        }

        if (len === 1) {
            return [ [], [H.head(xs)] ];
        }

        function _appendToEach(x, xss) {
            return H.map(function (xs) {
                return H.append([x], xs);
            }, xss);
        }

        var sequences = subsequences(H.init(xs));
        var appended = _appendToEach(H.last(xs), sequences);
        return H.append(sequences, appended);
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
    H.tail = function tail(xs) {
        var len = H.length(xs);
        if (H.isEmpty(xs)) {
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
    H.tails = function tails(xs) {
        function _tails(list, acc) {
            acc.push(list);
            if (H.isEmpty(list)) {
                return acc;
            }
            return _tails(H.tail(list), acc);
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
    H.take = function take(n, xs) {
        if (n <= 0 || H.isEmpty(xs)) {
            return [];
        }

        if (n > H.length(xs)) {
            return xs;
        }

        return xs.slice(0, n);
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
    H.takeWhile = function takeWhile(p, xs) {
        if (H.isEmpty(xs) || !p(H.head(xs))) {
            return [];
        }

        return H.append([H.head(xs)], takeWhile(p, H.tail(xs)));
    };

    /**
     * Transposes rows and columns of the arguments.
     *
     * @category Transformations
     * @public
     * @memberof H
     * @param {Array.Array.<T>} xss
     * @return {Array.Array.<T>}
     *
     * @example
     *
     * transpose([ [10,11], [20], [], [30,31,32] ])
     * // => [ [10,20,30], [11,31], [32] ]
     */
    H.transpose = function transpose(xss) {
        var maxLen = H.maximum(H.map(function (xs) { return H.length(xs); }, xss));

        // Get each element at the nth index of each list.
        // Filter out the undefined values.
        function _getEach(n, xss) {
            var isDefined = function (x) { return x !== undefined; };
            return H.filter(isDefined, H.map(function (xs) {
                if (n < H.length(xs)) {
                    return H.nth(n, xs);
                }
            }, xss));
        }

        function _transpose(xss, n, max, acc) {
            if (n >= max) { return acc; }
            var nth = _getEach(n, xss);
            return _transpose(xss, n + 1, max, utils.snoc(nth, acc));
        }

        return _transpose(xss, 0, maxLen, []);
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
    H.uncons = function uncons(xs) {
        if (H.isEmpty(xs)) {
            return null;
        }

        return {
            head: H.head(xs),
            tail: H.tail(xs)
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
    H.zip = function zip(xs, ys) {
        return H.zipN(xs, ys);
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
    H.zipN = function zipN() {
        var lists = Array.prototype.slice.call(arguments);
        var minLen = H.minimum(H.map(function (xs) { return H.length(xs); }, lists));

        // Get the nth element for all lists in a list.
        function _allAt(n, xss) {
            return H.map(function (xs) {
                return H.nth(n, xs);
            }, xss);
        }

        function _zipN(allLists, acc, currentN, maxN) {
            if (currentN >= maxN) {
                return acc;
            }

            var allAtCurrent = _allAt(currentN, allLists);
            var appended = H.append(acc, [allAtCurrent]);
            return _zipN(allLists, appended, currentN+1, maxN);
        }

        return _zipN(lists, [], 0, minLen);
    };


    // Curry functions by default
    H.map(function (key) {
        H[key] = utils.curry(H[key]);
    }, Object.keys(H));

    window.H = H;

    return H;

}());
