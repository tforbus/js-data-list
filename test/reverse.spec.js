describe('reverse', function () {
    var reverse;
    beforeEach(function () {
        reverse = H.reverse;
    });

    it('should not reverse empty rray', function () {
        expect(reverse([])).toEqual([]);
    });

    it('should not matter to reflect array of length 1', function () {
        expect(reverse([1])).toEqual([1]);
    });

    it('should reverse array of length >1', function () {
        expect(reverse([-1, -2 ,-3])).toEqual([-3, -2, -1]);
    });

});
