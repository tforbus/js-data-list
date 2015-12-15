import isEmpty from './isEmpty.js';
import { isString, toArray } from '../utils/string.js';
import uncons from './uncons.js';

export default function maximum (xs) {
    if (isEmpty(xs)) {
        return xs;
    }

    let [head, tail] = uncons(xs);

    if (isString(tail)) {
        tail = toArray(tail);
    }

    // TODO: reduce
    return tail.reduce(function (previous, current) {
        if (previous < current) {
            return current;
        }
        return previous;
    }, head);
}
