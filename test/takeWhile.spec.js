describe('takeWhile', function () {
    var takeWhile;
    beforeEach(function () {
        takeWhile = H.takeWhile;
    });

    it('should return [] for a list of length 0', function () {
        expect(takeWhile(function (x) { return x < 0; }, [])).toEqual([]);
    });

    it('should return only until it breaks the predicate', function () {
        expect(takeWhile(function (x) { return x < 3; }, [1,2,3,4,5,1,2])).toEqual([1,2]);
    });

    it('should return the whole list if they all pass the predicate', function () {
        expect(takeWhile(function (x) { return x < 9; }, [1,2,3,4,5])).toEqual([1,2,3,4,5]);
    });

    it('should return an empty list if none pass the predicate', function () {
        expect(takeWhile(function (x) { return x < 0; }, [1,2,3,4,5])).toEqual([]);
    });
});
