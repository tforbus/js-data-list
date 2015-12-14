import isEmpty from './isEmpty.js';

/**
 * Get the length of a list or string.
 *
 * Example:
 * length([1,2]) == 2
 * length('Foo') == 3
 */
export default function length(xs) {
    if (isEmpty(xs)) {
        return 0;
    }

    return xs.length;
}
