import { isString } from '../utils/string.js';
import head from './head.js';
import tail from './tail.js';

/**
 * Decompose list into head and tail.
 *
 * Example:
 * uncons([1,2,3]) == {fst: 1, snd: [2,3]}
 * uncons('Hello') == {fst: 'H', snd: 'ello'}
 */
export default function uncons(xs) {
    if (xs.length === 0) {
        return xs;
    }

    return {
        fst: head(xs),
        snd: tail(xs)
    };
}
