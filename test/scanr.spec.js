describe('scanr', function () {
    var scanr = H.scanr;
    var divide = function (x, y) { return x / y; };
    var multiply = function (x, y) { return x * y; };

    it('should return the initial value for an empty list', function () {
        expect(scanr(divide, 64, [])).toEqual([64]);
    });

    it('should apply the function to elements as it scans', function () {
        expect(scanr(divide, 2, [100, 20, 10])).toEqual([25, 4, 5, 2]);
        expect(scanr(multiply, 2, [4, 2, 0, 1])).toEqual([0, 0, 0, 2, 2]);
    });

});
