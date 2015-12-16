describe('minimum', function () {
    var minimum;
    beforeEach(function () {
        minimum = H.minimum;
    });

    it('should return empty result for empty array', function () {
        expect(function () {
            minimum([]);
        }).toThrow();
    });

    it('should return only element for length 1 array', function () {
        expect(minimum([1])).toEqual(1);
    });

    it('should return the minimum element for arrays', function () {
        expect(minimum([1,2,3,2,1])).toEqual(1);
    });
});
