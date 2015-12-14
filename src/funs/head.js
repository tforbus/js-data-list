import { isString } from '../utils/string.js';
import { isArray } from '../utils/array.js';
import length from './length.js';

/**
 * Return the first element of a list.
 *
 * Example:
 * head([1,2,3]) === 1
 * head('Foo') === 'F'
 */
export default function head(xs) {
    if (length(xs) === 0) {
        return xs;
    }

    if (isArray(xs)) {
        return xs[0];
    }

    if (isString(xs)) {
        return xs.charAt(0);
    }
}
