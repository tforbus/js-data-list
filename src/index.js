import curry from './utils/curry.js';
import concat from './funs/concat.js';
import head from './funs/head.js';
import init from './funs/init.js';
import isEmpty from './funs/isEmpty.js';
import last from './funs/last.js';
import map from './funs/map.js';
import length from './funs/length.js';
import tail from './funs/tail.js';
import uncons from './funs/uncons.js';

const library = {
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

export { library };
