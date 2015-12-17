describe('uncons', function () {
    var uncons;
    beforeEach(function () {
        uncons = H.uncons;
    });

    it('should return null for an empty list', function () {
        expect(uncons([])).toEqual(null);
    });

    it('should return the correct results for a list of length 1', function () {
        var result = uncons([1]);
        expect(result).toEqual({
            head: 1,
            tail: []
        });
    });

    it('should return correct results for a list of length >1', function () {
        expect(uncons([1,2,3])).toEqual({
            head: 1,
            tail: [2,3]
        });
    });
});
