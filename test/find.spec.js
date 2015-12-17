describe('find', function () {
    var find = H.find;
    var gt3 = function (x) { return x > 3; };

    it('should return null if it cannot find the element', function () {
        expect(find(gt3, [0,1,2])).toEqual(null);
    });

    it('should return the first match only', function () {
        expect(find(gt3, [0, 1, 2, 3, 4, 5])).toEqual(4);
    });
});
