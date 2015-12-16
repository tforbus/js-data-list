describe('map', function () {
    var map;
    beforeEach(function () {
        map = H.map;
    });

    it('should map a function to an array', function () {
        var incAll = map(function (x) { return x + 1; });
        var result = incAll([1,2,3]);

        expect(result.length).toEqual(3);
        expect(result).toEqual([2,3,4]);
    });

    it('should map a function to a string', function () {
        var upperAll = map(function (x) { return x.toUpperCase(); });
        var result = upperAll('ivory');

        expect(result.length).toBe(5);
        expect(result).toEqual('IVORY');
    });
});
