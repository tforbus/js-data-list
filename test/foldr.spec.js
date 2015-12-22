describe('foldr', function () {
    var foldr = H.foldr;
    var sum = function(x, y) { return x + y; };
    var sub = function (x, y) { return x - y; };

    it('should return the initial value for an empty list', function () {
        expect(foldr(sum, 1, [])).toEqual(1);
    });

    it('should sum the list if the function is x+y', function () {
        expect(foldr(sum, 1, [2,3])).toEqual(6);
    });

    it('should work from right to left', function () {
        expect(foldr(sub, 1, [2])).toEqual(1);

        // 2 - (-4 - 1)
        expect(foldr(sub, 1, [2, -4])).toEqual(7);
    });

});
