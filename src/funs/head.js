import { isString } from '../utils/string.js';

/**
 * Return the first element of a list.
 *
 * Example:
 * head([1,2,3]) === 1
 * head('Foo') === 'F'
 */
export default function head(xs) {
    if (xs.length === 0) {
        return xs;
    }

    if (Array.isArray(xs)) {
        return xs[0];
    }

    if (isString(xs)) {
        return xs.charAt(0);
    }
}
