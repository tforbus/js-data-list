describe('take', function () {
    var take;
    beforeEach(function () {
        take = H.take;
    });

    it('should take n when n < length xs', function () {
        expect(take(-1, [1])).toEqual([]);
        expect(take(0, [1,2])).toEqual([]);
        expect(take(1, [1,2])).toEqual([1]);
        expect(take(2, [1,2,3])).toEqual([1,2]);
    });

    it('should return the list when n == length xs', function () {
        expect(take(0, [])).toEqual([]);
        expect(take(1, [1])).toEqual([1]);
    });

    it('should get all elements when n > length xs', function () {
        expect(take(3, [1,2])).toEqual([1,2]);
    });
});
