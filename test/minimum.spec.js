describe('minimum', function () {
    var minimum;
    beforeEach(function () {
        minimum = H.minimum;
    });

    it('should return empty result for empty string/array', function () {
        expect(minimum([])).toEqual([]);
        expect(minimum('')).toEqual('');
    });

    it('should return only element for length 1 string/array', function () {
        expect(minimum([1])).toEqual(1);
        expect(minimum('f')).toEqual('f');
    });

    it('should return the minimum element for strings/arrays', function () {
        expect(minimum('abzba')).toEqual('a');
        expect(minimum([1,2,3,2,1])).toEqual(1);
    });
});
