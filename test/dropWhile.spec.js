describe('dropWhile', function () {
    var dropWhile;
    beforeEach(function () {
        dropWhile = H.dropWhile;
    });

    it('should drop only items until the predicate is broken', function () {
        expect(dropWhile(function (x) { return x < 3; }, [1,2,3,4,5,2,1])).toEqual([3,4,5,2,1]);
    });

    it('should drop all if the predicate is always true', function () {
        expect(dropWhile(function (x) { return x < 9; }, [1,2,3])).toEqual([]);
    });

    it('should return the list if the predicate is not true for list[0]', function () {
        expect(dropWhile(function (x) { return x < 0; }, [1, -1, -2, -3])).toEqual([1, -1, -2, -3]);
    });
});
