import { isString } from '../utils/string.js';
import { isArray } from '../utils/array.js';
import length from './length.js';

/**
 * Return all elements except the first in a list.
 *
 * Example:
 * tail([1,2,3]) == [2,3]
 * tail('Hello') == 'ello'
 */
export default function tail(xs) {
    let len = length(xs);

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
