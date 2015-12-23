describe('sum', function () {
    var sum = H.sum;

    it('should return 0 for an empty list', function () {
        expect(sum([])).toEqual(0);
    });

    it('should return the value for a list of length 1', function () {
        expect(sum([-1])).toEqual(-1);
        expect(sum([1])).toEqual(1);
    });

    it('should return the sum for a list', function () {
        expect(sum([1, 2, 3, 4])).toEqual(10);
    });
});
