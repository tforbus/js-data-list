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

    it('should partially apply the function to a list', function () {
        var add2 = function (x, y) { return x + y; };
        var added2 = map(add2, [1,2,3]);

        expect(added2[0](4)).toEqual(5);
        expect(added2[1](4)).toEqual(6);
        expect(added2[2](4)).toEqual(7);
    });
});
