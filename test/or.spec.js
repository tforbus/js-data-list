describe('or', function () {
    var or = H.or;

    it('should return false for an empty list', function () {
        expect(or([])).toEqual(false);
    });

    it('should return true if any elements are truthy', function () {
        expect(or([1, true, {}])).toEqual(true);
        expect(or([0, false, null])).toEqual(false);
    });
});
