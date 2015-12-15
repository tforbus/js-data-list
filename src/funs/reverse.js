import { isString, toArray, fromArray } from '../utils/string.js';
import { isArray } from '../utils/array.js';
import length from './length.js';

/**
 * Reverse a list.
 *
 * Example:
 * reverse([1,2,3]) == [3,2,1]
 * reverse('Foo') == 'ooF'
 */
export default function reverse(xs) {
    if (length(xs) === 0) {
        return xs;
    }

    if (isArray(xs)) {
        return xs.reverse();
    }

    if (isString(xs)) {
        return fromArray(toArray(xs).reverse());
    }
}
