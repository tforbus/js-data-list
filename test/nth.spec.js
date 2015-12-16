describe('nth', function () {
    var nth;
    beforeEach(function () {
        nth = H.nth;
    });

    it('should throw an error when n exceeds the lenght of the list', function () {
        expect(function () {
            nth(4, [1,2,3]);
        }).toThrow();
    });

    it('should return the correct element for a non-empty list', function () {
        expect(nth(2, [1,2,3])).toBe(3);
    });
});
