describe('last', function () {
    var last;
    var isArray;
    beforeEach(function () {
        last = H.last;
        isArray = H.utils.isArray;
    });

    it('should return empty string for empty string', function () {
        expect(last('')).toBe('');
    });

    it('should return empty list for empty list', function () {
        var result = last([]);
        expect(result.length).toBe(0);
        expect(isArray(result)).toBe(true);
    });

    it('should return the only element for string of length 1', function () {
        expect(last('f')).toBe('f');
    });

    it('should return the only element for array of length 1', function () {
        expect(last([10])).toBe(10);
    });

    it('should return the last element for string of length >1', function () {
        expect(last('ivory')).toBe('y');
    });

    it('should return the last element for array of length >1', function () {
        expect(last([1,2,3,-1])).toBe(-1);
    });
});
