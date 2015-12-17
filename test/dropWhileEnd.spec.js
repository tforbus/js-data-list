describe('dropWhileEnd', function () {
    var dropWhileEnd;
    beforeEach(function () {
        dropWhileEnd = H.dropWhileEnd;
    });

    it('should drop items from the end', function () {
        expect(dropWhileEnd(function (x) { return x < 3; }, [1,2,3,2,1])).toEqual([1,2,3]);
    });

    it('should not drop any if predicate not true', function () {
        expect(dropWhileEnd(function (x) { return x < 3; }, [1,2,3,4,5])).toEqual([1,2,3,4,5]);
    });

    it('should drop all if always true', function () {
        expect(dropWhileEnd(function (x) { return x < 3; }, [1,2,0])).toEqual([]);
    });
});
