describe('filter', function () {
    var filter = H.filter;
    var gt3 = function (x) { return x > 3; };

    it('should return [] for filtering an empty list', function () {
        expect(filter(gt3, [])).toEqual([]);
    });

    it('should return [] when no elements pass predicate', function () {
        expect(filter(gt3, [0,1,2])).toEqual([]);
    });

    it('should return all elements when all elements pass', function () {
        expect(filter(gt3, [4,5,6])).toEqual([4,5,6]);
    });

    it('should filter out elements that do not pass', function () {
        expect(filter(gt3, [1,2,3,4,5,6])).toEqual([4,5,6]);
    });

});
