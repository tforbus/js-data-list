describe('concat', function () {
    var concatMap = H.concatMap;
    var filter = H.filter;

    it('should map a function over a list of lists and return a single list as a result', function () {
        var list = [ [1,2,3], [4,5,6], [7,8,9] ];
        var f = filter(function (x) { return x > 3; });
        var result = concatMap(f, list);
        expect(result).toEqual([4,5,6,7,8,9]);
    });
});
