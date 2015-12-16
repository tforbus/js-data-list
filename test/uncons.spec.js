describe('uncons', function () {
    var uncons;
    beforeEach(function () {
        uncons = H.uncons;
    });

    it('should return empty elements for empty strings/lists', function () {
        expect(uncons('')).toEqual('');
        expect(uncons([])).toEqual([]);
    });

    it('should return an array of length 2 for nonempty strings/lists', function () {
        expect(uncons('f')).toEqual(['f', '']);
        expect(uncons([1,2,3])).toEqual([1, [2,3]]);
    });
});
