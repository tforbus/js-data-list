import { isArray } from '../utils/array.js';
import { isString, toArray, fromArray } from '../utils/string.js';

/**
 * map function fn onto each element in xs.
 */
export default function map(fn, xs) {
    if (isArray(xs)) {
        return xs.map(fn);
    }

    if (isString(xs)) {
        return fromArray(toArray(xs).map(fn));
    }
}
