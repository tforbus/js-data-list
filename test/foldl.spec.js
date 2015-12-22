describe('foldl', function () {
    var foldl = H.foldl;
    var sum = function(x, y) { return x + y; };
    var sub = function (x, y) { return x - y; };

    it('should return the initial value for an empty list', function () {
        expect(foldl(sum, 1, [])).toEqual(1);
    });

    it('should sum the list if the function is x+y', function () {
        expect(foldl(sum, 1, [2,3])).toEqual(6);
    });

    it('should work from left to right', function () {
        expect(foldl(sub, 1, [2])).toEqual(-1);

        // 1 - 2 - -4
        expect(foldl(sub, 1, [2, -4])).toEqual(3);
    });

});
