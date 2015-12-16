describe('reverse', function () {
    var reverse;
    beforeEach(function () {
        reverse = H.reverse;
    });

    it('should not reverse empty string/array', function () {
        expect(reverse('')).toEqual('');
        expect(reverse([])).toEqual([]);
    });

    it('should not matter to reflect string/array of length 1', function () {
        expect(reverse('f')).toEqual('f');
        expect(reverse([1])).toEqual([1]);
    });

    it('should reverse string/array of length >1', function () {
        expect(reverse('ivory')).toEqual('yrovi');
        expect(reverse([-1, -2 ,-3])).toEqual([-3, -2, -1]);
    });

});
