describe('maximum', function () {
    var maximum;
    beforeEach(function () {
        maximum = H.maximum;
    });

    it('should return empty result for empty string/array', function () {
        expect(maximum([])).toEqual([]);
        expect(maximum('')).toEqual('');
    });

    it('should return only element for length 1 string/array', function () {
        expect(maximum([1])).toEqual(1);
        expect(maximum('f')).toEqual('f');
    });

    it('should return the maximum element for strings/arrays', function () {
        expect(maximum('abzba')).toEqual('z');
        expect(maximum([1,2,3,2,1])).toEqual(3);
    });
});
