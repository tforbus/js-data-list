describe('all', function () {
    var all = H.all;

    it('should return true for an empty list', function () {
        expect(all(function (x) { return x > 1; }, [])).toEqual(true);
    });

    it('should return true iff all elements pass', function () {
        expect(all(function (x) { return x > 0; }, [1,2,3])).toBe(true);
        expect(all(function (x) { return x > 0; }, [1,2,0])).toBe(false);
    });

});
