describe('scanl', function () {
    var scanl = H.scanl;
    var divide = function (x, y) { return x / y; };
    var multiply = function (x, y) { return x * y; };

    it('should return the initial value for an empty list', function () {
        expect(scanl(divide, 64, [])).toEqual([64]);
    });

    it('should apply the function to elements as it scans', function () {
        expect(scanl(divide, 64, [4, 2, 4])).toEqual([64, 16, 8, 2]);
        expect(scanl(multiply, 2, [4, 2, 0, 1])).toEqual([2, 8, 16, 0, 0]);
    });

});
