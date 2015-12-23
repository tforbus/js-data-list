describe('and', function () {
    var and = H.and;

    it('should return true for an empty list', function () {
        expect(and([])).toEqual(true);
    });

    it('should return true iff all elements are truthy', function () {
        expect(and([1, true, {}])).toEqual(true);
        expect(and([0, true, {}])).toEqual(false);
    });

});
