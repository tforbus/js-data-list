import { isString } from '../utils/string.js';

/**
 * Return the last element of a list.
 *
 * Example:
 * last([1,2,3]) === 3
 * last('Foo') === 'o'
 */
export default function last(xs) {
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
