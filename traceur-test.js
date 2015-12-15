System.registerModule("src/funs/concat.js", [], function() {
  "use strict";
  var __moduleName = "src/funs/concat.js";
  function concat(as, bs) {
    return as.concat(bs);
  }
  var $__default = concat;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("src/utils/array.js", [], function() {
  "use strict";
  var __moduleName = "src/utils/array.js";
  function isArray(xs) {
    return Array.isArray(xs);
  }
  return {get isArray() {
      return isArray;
    }};
});
System.registerModule("src/utils/string.js", [], function() {
  "use strict";
  var __moduleName = "src/utils/string.js";
  function isString(xs) {
    return typeof xs === 'string';
  }
  function toArray(xs) {
    return xs.split('');
  }
  function fromArray(xs) {
    return xs.join('');
  }
  return {
    get isString() {
      return isString;
    },
    get toArray() {
      return toArray;
    },
    get fromArray() {
      return fromArray;
    }
  };
});
System.registerModule("src/funs/isEmpty.js", [], function() {
  "use strict";
  var __moduleName = "src/funs/isEmpty.js";
  function isEmpty(xs) {
    return xs && !xs.length;
  }
  var $__default = isEmpty;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("src/funs/length.js", [], function() {
  "use strict";
  var __moduleName = "src/funs/length.js";
  var isEmpty = System.get("src/funs/isEmpty.js").default;
  function length(xs) {
    if (isEmpty(xs)) {
      return 0;
    }
    return xs.length;
  }
  var $__default = length;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("src/funs/head.js", [], function() {
  "use strict";
  var __moduleName = "src/funs/head.js";
  var isString = System.get("src/utils/string.js").isString;
  var isArray = System.get("src/utils/array.js").isArray;
  var length = System.get("src/funs/length.js").default;
  function head(xs) {
    if (length(xs) === 0) {
      return xs;
    }
    if (isArray(xs)) {
      return xs[0];
    }
    if (isString(xs)) {
      return xs.charAt(0);
    }
  }
  var $__default = head;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("src/funs/init.js", [], function() {
  "use strict";
  var __moduleName = "src/funs/init.js";
  var isString = System.get("src/utils/string.js").isString;
  var isArray = System.get("src/utils/array.js").isArray;
  var length = System.get("src/funs/length.js").default;
  function init(xs) {
    var len = length(xs);
    if (!len) {
      return xs;
    }
    if (isArray(xs)) {
      return xs.slice(-1 * len + 1);
    }
    if (isString(xs)) {
      return xs.substring(0, len - 1);
    }
  }
  var $__default = init;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("src/funs/last.js", [], function() {
  "use strict";
  var __moduleName = "src/funs/last.js";
  var isString = System.get("src/utils/string.js").isString;
  var isArray = System.get("src/utils/array.js").isArray;
  var length = System.get("src/funs/length.js").default;
  function last(xs) {
    var len = length(xs);
    if (!len) {
      return xs;
    }
    if (isArray(xs)) {
      return xs[len - 1];
    }
    if (isString(xs)) {
      return xs.charAt(len - 1);
    }
  }
  var $__default = last;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("src/funs/map.js", [], function() {
  "use strict";
  var __moduleName = "src/funs/map.js";
  var isArray = System.get("src/utils/array.js").isArray;
  var $__1 = System.get("src/utils/string.js"),
      isString = $__1.isString,
      toArray = $__1.toArray,
      fromArray = $__1.fromArray;
  function map(fn, xs) {
    if (isArray(xs)) {
      return xs.map(fn);
    }
    if (isString(xs)) {
      return fromArray(toArray(xs).map(fn));
    }
  }
  var $__default = map;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("src/funs/tail.js", [], function() {
  "use strict";
  var __moduleName = "src/funs/tail.js";
  var isString = System.get("src/utils/string.js").isString;
  var isArray = System.get("src/utils/array.js").isArray;
  var length = System.get("src/funs/length.js").default;
  function tail(xs) {
    var len = length(xs);
    if (!len) {
      return xs;
    }
    if (isArray(xs)) {
      return xs.slice(1);
    }
    if (isString(xs)) {
      return xs.substring(1, len);
    }
  }
  var $__default = tail;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("src/funs/uncons.js", [], function() {
  "use strict";
  var __moduleName = "src/funs/uncons.js";
  var isString = System.get("src/utils/string.js").isString;
  var head = System.get("src/funs/head.js").default;
  var tail = System.get("src/funs/tail.js").default;
  var length = System.get("src/funs/length.js").default;
  function uncons(xs) {
    if (!length(xs)) {
      return xs;
    }
    return [head(xs), tail(xs)];
  }
  var $__default = uncons;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("src/funs/maximum.js", [], function() {
  "use strict";
  var __moduleName = "src/funs/maximum.js";
  var isEmpty = System.get("src/funs/isEmpty.js").default;
  var $__1 = System.get("src/utils/string.js"),
      isString = $__1.isString,
      toArray = $__1.toArray;
  var uncons = System.get("src/funs/uncons.js").default;
  function maximum(xs) {
    var $__5,
        $__6;
    if (isEmpty(xs)) {
      return xs;
    }
    var $__4 = uncons(xs),
        head = ($__5 = $__4[Symbol.iterator](), ($__6 = $__5.next()).done ? void 0 : $__6.value),
        tail = ($__6 = $__5.next()).done ? void 0 : $__6.value;
    if (isString(tail)) {
      tail = toArray(tail);
    }
    return tail.reduce(function(previous, current) {
      if (previous < current) {
        return current;
      }
      return previous;
    }, head);
  }
  var $__default = maximum;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("src/funs/reverse.js", [], function() {
  "use strict";
  var __moduleName = "src/funs/reverse.js";
  var $__0 = System.get("src/utils/string.js"),
      isString = $__0.isString,
      toArray = $__0.toArray,
      fromArray = $__0.fromArray;
  var isArray = System.get("src/utils/array.js").isArray;
  var length = System.get("src/funs/length.js").default;
  function reverse(xs) {
    if (length(xs) === 0) {
      return xs;
    }
    if (isArray(xs)) {
      return xs.reverse();
    }
    if (isString(xs)) {
      return fromArray(toArray(xs).reverse());
    }
  }
  var $__default = reverse;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("src/funs/zip.js", [], function() {
  "use strict";
  var __moduleName = "src/funs/zip.js";
  var $__0 = System.get("src/utils/string.js"),
      isString = $__0.isString,
      toArray = $__0.toArray;
  var isArray = System.get("src/utils/array.js").isArray;
  var length = System.get("src/funs/length.js").default;
  var map = System.get("src/funs/map.js").default;
  function zip(xs, ys) {
    var counter = 0;
    var results = [];
    while (counter < Math.min(xs.length, ys.length)) {
      results.push([xs[counter], ys[counter]]);
      counter += 1;
    }
    return results;
  }
  var $__default = zip;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("src/utils/curry.js", [], function() {
  "use strict";
  var __moduleName = "src/utils/curry.js";
  function curry(fn) {
    var arity = fn.length;
    return (function resolver() {
      var memory = Array.prototype.slice.call(arguments);
      return function() {
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
  }
  var $__default = curry;
  return {get default() {
      return $__default;
    }};
});
System.registerModule("src/index.js", [], function() {
  "use strict";
  var __moduleName = "src/index.js";
  var curry = System.get("src/utils/curry.js").default;
  var concat = System.get("src/funs/concat.js").default;
  var head = System.get("src/funs/head.js").default;
  var init = System.get("src/funs/init.js").default;
  var isEmpty = System.get("src/funs/isEmpty.js").default;
  var last = System.get("src/funs/last.js").default;
  var length = System.get("src/funs/length.js").default;
  var map = System.get("src/funs/map.js").default;
  var maximum = System.get("src/funs/maximum.js").default;
  var reverse = System.get("src/funs/reverse.js").default;
  var tail = System.get("src/funs/tail.js").default;
  var uncons = System.get("src/funs/uncons.js").default;
  var zip = System.get("src/funs/zip.js").default;
  var library = {
    curry: curry,
    concat: curry(concat),
    head: curry(head),
    init: curry(init),
    isEmpty: curry(isEmpty),
    last: curry(last),
    length: curry(length),
    map: curry(map),
    maximum: curry(maximum),
    reverse: curry(reverse),
    tail: curry(tail),
    uncons: curry(uncons),
    zip: curry(zip)
  };
  return {get library() {
      return library;
    }};
});
System.get("src/index.js" + '');
