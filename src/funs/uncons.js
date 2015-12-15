import { isString } from '../utils/string.js';
import head from './head.js';
import tail from './tail.js';
import length from './length.js';

/**
 * Decompose list into head and tail.
 *
 * Example:
 * uncons([1,2,3]) == [1, [2,3]]
 * uncons('Hello') == ['H', 'ello']
 */
export default function uncons(xs) {
    if (!length(xs)) {
        return xs;
    }

    return [head(xs), tail(xs)];
}
