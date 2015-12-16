describe('utils', function () {
    var utils;

    beforeEach(function () {
        utils = window.H.utils;
    });

    it('should exist', function () {
        expect(utils).not.toBe(undefined);
    });

    it('#stringToArray should preserve length', function () {
        var result = utils.stringToArray('foo');
        expect(result.length).toBe(3);
        expect(result[0]).toEqual('f');

        var result2 = utils.stringToArray('');
        expect(result2.length).toBe(0);
    });

    it('#arrayToString should preserve length', function () {
        var result = utils.arrayToString([1,2,3]);
        expect(result.length).toBe(3);
        expect(result).toBe('123');

        var result2 = utils.arrayToString([]);
        expect(result2.length).toBe(0);
        expect(result2).toBe('');
    });

    it('#isArray should return true for arrays', function () {
        expect(utils.isArray([])).toBe(true);
        expect(utils.isArray([1])).toBe(true);
        expect(utils.isArray(null)).toBe(false);
        expect(utils.isArray('foo')).toBe(false);
    });

    it('#curry should work', function () {
        var add = utils.curry(function (x, y) { return x + y; });
        var increment = add(1);
        expect(typeof increment).toBe('function');
        expect(increment(3)).toBe(4);
    });

    it('#zeroArray should return an array full of 0s', function () {
        var result = utils.zeroArray(3);
        expect(result.length).toBe(3);
        expect(result).toEqual([0, 0, 0]);
    });
});
