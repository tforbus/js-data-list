import { isString } from '../utils/string.js';

/**
 * Return all elements except the first in a list.
 *
 * Example:
 * tail([1,2,3]) == [2,3]
 * tail('Hello') == 'ello'
 */
export default function tail(xs) {
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
