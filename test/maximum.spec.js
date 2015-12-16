describe('maximum', function () {
    var maximum;
    beforeEach(function () {
        maximum = H.maximum;
    });

    it('should return empty result for empty array', function () {
        expect(function () {
            maximum([]);
        }).toThrow();
    });

    it('should return only element for length 1 array', function () {
        expect(maximum([1])).toEqual(1);
    });

    it('should return the maximum element for arrays', function () {
        expect(maximum([1,2,3,2,1])).toEqual(3);
    });
});
