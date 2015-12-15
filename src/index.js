import curry from './utils/curry.js';
import concat from './funs/concat.js';
import head from './funs/head.js';
import init from './funs/init.js';
import isEmpty from './funs/isEmpty.js';
import last from './funs/last.js';
import length from './funs/length.js';
import map from './funs/map.js';
import maximum from './funs/maximum.js';
import reverse from './funs/reverse.js';
import tail from './funs/tail.js';
import uncons from './funs/uncons.js';
import zip from './funs/zip.js';

const library = {
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

export { library };
