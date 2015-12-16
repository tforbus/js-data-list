describe('zip', function () {
    var zip;
    var zipN;

    beforeEach(function () {
        zip = H.zip;
        zipN = H.zipN;
    });

    it('zip - should return empty array for two empty params', function () {
        expect(zip([], [])).toEqual([]);
    });

    it('zip - should only zip until the minimum length', function () {
        expect(zip([1,2,3], [1,2]).length).toBe(2);
    });

    it('zip - should zip properly', function () {
        var result = zip([1,2,3], 'ivory');
        expect(result.length).toBe(3);
        expect(result[0]).toEqual([1, 'i']);
        expect(result[1]).toEqual([2, 'v']);
        expect(result[2]).toEqual([3, 'o']);
    });

    it('zipN - should  zip 3 lists appropriately', function () {
        var result = zipN([1,2,3], [4,5,6], [7,8]);

        expect(result.length).toBe(2);
        expect(result[0]).toEqual([1, 4, 7]);
        expect(result[1]).toEqual([2, 5, 8]);
    });
});
