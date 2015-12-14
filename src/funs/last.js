import { isString } from '../utils/string.js';
import { isArray } from '../utils/array.js';
import length from './length.js';

/**
 * Return the last element of a list.
 *
 * Example:
 * last([1,2,3]) === 3
 * last('Foo') === 'o'
 */
export default function last(xs) {
    let len = length(xs);

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
