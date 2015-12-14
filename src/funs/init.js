import { isString } from '../utils/string.js';

/**
 * Return all elements except the last.
 *
 * Example:
 * init([1,2,3]) == [1,2]
 * init('Foo') == 'Fo'
 */
export default function init(xs) {
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
