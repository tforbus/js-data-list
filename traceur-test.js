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
System.registerModule("src/funs/head.js", [], function() {
  "use strict";
  var __moduleName = "src/funs/head.js";
  var isString = System.get("src/utils/string.js").isString;
  function head(xs) {
    if (xs.length === 0) {
      return xs;
    }
    if (Array.isArray(xs)) {
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
  function init(xs) {
    if (xs.length === 0) {
      return xs;
    }
    if (Array.isArray(xs)) {
      return xs.slice(-1 * xs.length + 1);
    }
    if (isString(xs)) {
      return xs.substring(0, xs.length - 1);
    }
  }
  var $__default = init;
  return {get default() {
      return $__default;
    }};
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
System.registerModule("src/funs/last.js", [], function() {
  "use strict";
  var __moduleName = "src/funs/last.js";
  var isString = System.get("src/utils/string.js").isString;
  function last(xs) {
    if (xs.length === 0) {
      return xs;
    }
    if (Array.isArray(xs)) {
      return xs[xs.length - 1];
    }
    if (isString(xs)) {
      return xs.charAt(xs.length - 1);
    }
  }
  var $__default = last;
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
  function tail(xs) {
    if (xs.length === 0) {
      return xs;
    }
    if (Array.isArray(xs)) {
      return xs.slice(1);
    }
    if (isString(xs)) {
      return xs.substring(1, xs.length);
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
  function uncons(xs) {
    if (xs.length === 0) {
      return xs;
    }
    return {
      fst: head(xs),
      snd: tail(xs)
    };
  }
  var $__default = uncons;
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
  var map = System.get("src/funs/map.js").default;
  var length = System.get("src/funs/length.js").default;
  var tail = System.get("src/funs/tail.js").default;
  var uncons = System.get("src/funs/uncons.js").default;
  var library = {
    curry: curry,
    concat: curry(concat),
    head: curry(head),
    init: curry(init),
    isEmpty: curry(isEmpty),
    last: curry(last),
    length: curry(length),
    map: curry(map),
    tail: curry(tail),
    uncons: curry(uncons)
  };
  return {get library() {
      return library;
    }};
});
System.get("src/index.js" + '');
