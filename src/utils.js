(function (H) {
    'use strict';
    var utils = { };

    utils.stringToArray = function stringToArray(str) {
        return str.split('');
    };

    utils.arrayToString = function arrayToString(xs) {
        return xs.join('');
    };

    utils.isString = function isString(x) {
        return typeof x === 'string';
    };

    utils.isArray = function isArray(x) {
        return Array.isArray(x);
    };

    utils.zeroArray = function zeroArray(size) {
        return new Array(size + 1).join(0).split('').map(parseFloat);
    };

    utils.curry = function curry(fn) {
        var arity = fn.length;

        return (function resolver() {
            var memory = Array.prototype.slice.call(arguments);

            return function () {
                var localArgs = memory.slice();
                var func;

                Array.prototype.push.apply(localArgs, arguments);

                if (localArgs.length >= arity) {
                    func = fn;
                } else {
                    func = resolver;
                }

                return func.apply(null, localArgs);
            };
        }());
    };

    H.utils = utils;
    return H;

}(H || {}));
