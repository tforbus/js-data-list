function isString(xs) {
    return typeof xs === 'string';
}

function toArray(xs) {
    return xs.split('');
}

function fromArray(xs) {
    return xs.join('');
}

export {
    isString,
    toArray,
    fromArray
};
