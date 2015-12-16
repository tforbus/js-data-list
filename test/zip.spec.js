describe('zip', function () {
    var zip;
    beforeEach(function () {
        zip = H.zip;
    });

    it('should return empty array for two empty params', function () {
        expect(zip([], [])).toEqual([]);
        expect(zip('', '')).toEqual([]);
    });

    it('should only zip until the minimum length', function () {
        expect(zip([1,2,3], [1,2]).length).toBe(2);
    });

    it('should zip properly', function () {
        var result = zip([1,2,3], 'ivory');
        expect(result.length).toBe(3);
        expect(result[0]).toEqual([1, 'i']);
        expect(result[1]).toEqual([2, 'v']);
        expect(result[2]).toEqual([3, 'o']);
    });
});
