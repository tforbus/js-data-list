import { isString, toArray } from '../utils/string.js';
import { isArray } from '../utils/array.js';
import length from './length.js';
import map from './map.js';

export default function zip(xs, ys) {
    let counter = 0;
    let results = [];
    while (counter < Math.min(xs.length, ys.length)) {
        results.push([xs[counter], ys[counter]]);
        counter+=1;
    }
    
    return results;
}
