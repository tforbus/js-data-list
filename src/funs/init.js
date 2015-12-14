import { isString } from '../utils/string.js';
import { isArray } from '../utils/array.js';
import length from './length.js';

/**
 * Return all elements except the last.
 *
 * Example:
 * init([1,2,3]) == [1,2]
 * init('Foo') == 'Fo'
 */
export default function init(xs) {
    let len = length(xs);

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
