describe('stripPrefix', function () {
    var stripPrefix = H.stripPrefix;

    it('should return all element not in the prefix', function () {
        expect(stripPrefix([1,2,3], [1,2,3,4,5,6])).toEqual([4,5,6]);
    });

    it('should return [] if the list is the prefix', function () {
        expect(stripPrefix([1,2,3], [1,2,3])).toEqual([]);
    });

    it('should return null if the prefix is not in the beginning of the list', function () {
        expect(stripPrefix([1,2,3], [4,5,6])).toBe(null);
    });
});
