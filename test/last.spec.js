describe('last', function () {
    var last;
    var isArray;
    beforeEach(function () {
        last = H.last;
        isArray = H.utils.isArray;
    });

    it('should throw an error for an empty list', function () {
        expect(function () {
            last([]);
        }).toThrow();
    });

    it('should return the only element for array of length 1', function () {
        expect(last([10])).toBe(10);
    });

    it('should return the last element for array of length >1', function () {
        expect(last([1,2,3,-1])).toBe(-1);
    });
});
