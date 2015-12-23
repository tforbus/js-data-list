describe('any', function () {
    var any = H.any;
    var gt3 = function (x) { return x > 3; };

    it('should return false fany an empty list', function () {
        expect(any(gt3, [])).toEqual(false);
    });

    it('should return true if any elements are truthy', function () {
        expect(any(gt3, [0, 1, 2, 3, 4])).toEqual(true);
        expect(any(gt3, [0, 1, 2, 3])).toEqual(false);
    });
});
